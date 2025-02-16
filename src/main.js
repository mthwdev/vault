const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		title: "vault",
		width: 800,
		height: 600,
		resizable: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.removeMenu();
	mainWindow.loadURL("http://localhost:5173/");
}

app.whenReady().then(() => {
	createMainWindow();
	ipcMain.handle("get-accounts", getAccounts);
	ipcMain.handle("add-account", (event, accountData) =>
		addAccount(accountData)
	);
	ipcMain.handle("update-account", (event, accountId, accountData) =>
		updateAccount(accountId, accountData)
	);
	ipcMain.handle("login-riot", (event, account) => loginRiot(account));
});

async function getAccounts() {
	const filePath = path.join(__dirname, "userdata.json");

	await initializeUserdata(filePath);

	try {
		const data = await fs.promises.readFile(filePath);
		return JSON.parse(data);
	} catch (error) {
		console.error("error reading userdata:", error);
		return [];
	}
}

async function addAccount(accountData) {
	const filePath = path.join(__dirname, "userdata.json");

	console.log("received data:", accountData);

	try {
		const accounts = JSON.parse(await fs.promises.readFile(filePath));

		const highestId = accounts.length
			? accounts.reduce((max, account) => Math.max(max, account.id), 0)
			: 0;

		const newAccount = {
			id: highestId + 1,
			...accountData,
		};

		accounts.push(newAccount);

		await fs.promises.writeFile(
			filePath,
			JSON.stringify(accounts, null, 4)
		);

		console.log(`account added with id: ${highestId + 1}`);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function updateAccount(accountId, accountData) {
	console.log("updating account", accountId, ", with data:", accountData);
	const filePath = path.join(__dirname, "userdata.json");

	try {
		const accounts = JSON.parse(await fs.promises.readFile(filePath));

		const accountIndex = accounts.findIndex(
			(account) => account.id === accountId
		);

		if (accountIndex === -1) {
			console.log(`account with ID ${accountId} not found.`);
			return false;
		}

		const updatedAccount = {
			id: accountId,
			...accountData,
		};
		accounts[accountIndex] = updatedAccount;

		await fs.promises.writeFile(
			filePath,
			JSON.stringify(accounts, null, 4)
		);

		console.log(`account ${accountId} updated successfully`);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function initializeUserdata(filePath) {
	try {
		await fs.promises.access(filePath).catch(async () => {
			await fs.promises.writeFile(filePath, "[]");
			console.log("userdata file created and initialized");
		});
	} catch (error) {
		console.error("error initializing userdata file:", error);
	}
}

function loginRiot(account) {
	const searchTitle = "Riot";
	const psCommand = `
    Add-Type @"
        using System;
        using System.Runtime.InteropServices;
        public class Win32 {
            [DllImport("user32.dll")]
            [return: MarshalAs(UnmanagedType.Bool)]
            public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
            
            [DllImport("user32.dll")]
            [return: MarshalAs(UnmanagedType.Bool)]
            public static extern bool SetForegroundWindow(IntPtr hWnd);
            
            [DllImport("user32.dll")]
            public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
            
            [DllImport("user32.dll")]
            public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
            
            [DllImport("user32.dll")]
            public static extern void mouse_event(int dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
            
            [DllImport("user32.dll")]
            public static extern bool SetCursorPos(int X, int Y);
            
            [DllImport("user32.dll")]
            public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
            
            [StructLayout(LayoutKind.Sequential)]
            public struct RECT
            {
                public int Left;
                public int Top;
                public int Right;
                public int Bottom;
            }
        }
"@

    Add-Type -AssemblyName System.Windows.Forms

    $process = Get-Process | Where-Object { $_.MainWindowTitle -like "*${searchTitle}*" } | Select-Object -First 1
    if ($process) {
        Write-Output "STATUS: Found window '$($process.MainWindowTitle)'"
        $hwnd = $process.MainWindowHandle
        
        $rect = New-Object Win32+RECT
        [Win32]::GetWindowRect($hwnd, [ref]$rect)
        $width = $rect.Right - $rect.Left
        $height = $rect.Bottom - $rect.Top
        
        $screen = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea
        
        $x = [Math]::Max(0, [Math]::Floor(($screen.Width - $width) / 2) + $screen.Left)
        $y = [Math]::Max(0, [Math]::Floor(($screen.Height - $height) / 2) + $screen.Top)
        
        Write-Output "MOVING: Window to X=$x, Y=$y, Width=$width, Height=$height"
        
        $moved = [Win32]::MoveWindow($hwnd, $x, $y, $width, $height, $true)
        $restored = [Win32]::ShowWindow($hwnd, 9)
        $focused = [Win32]::SetForegroundWindow($hwnd)
        
        # Calculate center point of window
        $centerX = $x + ($width / 2)
        $centerY = $y + ($height / 2)
        
        # Move cursor to center and click
        [Win32]::SetCursorPos([int]$centerX, [int]$centerY)
        # Simulate left mouse button click
        [Win32]::mouse_event(0x0002, 0, 0, 0, 0)
        [Win32]::mouse_event(0x0004, 0, 0, 0, 0)

        # Add small delay before key presses
        Start-Sleep -Milliseconds 100
        
        # Press Tab 3 times
        for ($i = 0; $i -lt 3; $i++) {
            [Win32]::keybd_event(0x09, 0, 0, 0)    # Tab down
            [Win32]::keybd_event(0x09, 0, 2, 0)    # Tab up
            Start-Sleep -Milliseconds 50
        }
        
        # Add small delay before first typing
        Start-Sleep -Milliseconds 100
        
        # Type first placeholder
        [System.Windows.Forms.SendKeys]::SendWait("${account.username}")
        
        # Press Tab once
        Start-Sleep -Milliseconds 50
        [Win32]::keybd_event(0x09, 0, 0, 0)    # Tab down
        [Win32]::keybd_event(0x09, 0, 2, 0)    # Tab up
        
        # Type second placeholder
        Start-Sleep -Milliseconds 50
        [System.Windows.Forms.SendKeys]::SendWait("${account.password}")
        
        # Press Tab 7 times
        for ($i = 0; $i -lt 7; $i++) {
            [Win32]::keybd_event(0x09, 0, 0, 0)    # Tab down
            [Win32]::keybd_event(0x09, 0, 2, 0)    # Tab up
            Start-Sleep -Milliseconds 50
        }
        
        # Press Enter (Virtual key code 0x0D)
        Start-Sleep -Milliseconds 50
        [Win32]::keybd_event(0x0D, 0, 0, 0)    # Enter down
        [Win32]::keybd_event(0x0D, 0, 2, 0)    # Enter up
        
        Write-Output "RESULT: Window operations completed (Restored=$restored, Moved=$moved, Focused=$focused, Clicked=True, AllInputsEntered=True)"
    } else {
        Write-Output "ERROR: No window found matching '$searchTitle'"
    }
    `;
	const ps = spawn("powershell.exe", ["-Command", psCommand]);

	ps.stdout.on("data", (data) => {
		const cleanOutput = data.toString().trim();
		if (cleanOutput) {
			console.log(cleanOutput);
		}
	});

	ps.stderr.on("data", (data) => {
		console.error(`error: ${data}`);
	});

	ps.on("close", (code) => {
		if (code !== 0) {
			console.log(`process exited with code: ${code}`);
		}
	});
}
