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
		icon: path.join(__dirname, "vaulticon.ico"),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.removeMenu();
	if (app.isPackaged) {
		mainWindow.loadFile(path.join(__dirname, "/renderer/dist/index.html"));
	} else {
		mainWindow.loadURL("http://localhost:5173/");
	}
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

function getResourcePath(fileName) {
	return app.isPackaged
		? path.join(process.resourcesPath, fileName)
		: path.join(__dirname, fileName);
}

function getUserDataPath(fileName) {
	return app.isPackaged
		? path.join(app.getPath("userData"), fileName)
		: path.join(__dirname, fileName);
}

async function getAccounts() {
	const filePath = getUserDataPath("userdata.json");

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
	const filePath = getUserDataPath("userdata.json");

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
	const filePath = getUserDataPath("userdata.json");

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
	const filePath = getResourcePath("loginRiot.ps1");

	const ps = spawn("powershell.exe", [
		"-ExecutionPolicy",
		"Bypass",
		"-File",
		filePath,
		account.username,
		account.password,
	]);
	ps.stdout.on("data", (data) => {
		const cleanOutput = data.toString().trim();
		if (cleanOutput) {
			console.log(cleanOutput);
		}
	});

	ps.stderr.on("data", (data) => {
		console.error(`error: ${data}`);
	});
}
