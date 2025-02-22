param (
    [string]$username,
    [string]$password
)

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
Write-Output "-----"
Write-Output "executing powershell script"

$process = Get-Process | Where-Object { $_.MainWindowTitle -like "*Riot Client*" } | Select-Object -First 1
if ($process) {
    Write-Output "found window '$($process.MainWindowTitle)'"
    $hwnd = $process.MainWindowHandle
    
    [Win32]::ShowWindow($hwnd, 9) | Out-Null
    Start-Sleep -Milliseconds 100
    
    [Win32]::SetForegroundWindow($hwnd) | Out-Null
    Start-Sleep -Milliseconds 100
    
    $rect = New-Object Win32+RECT
    [Win32]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top
    
    $screen = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea
    $x = [Math]::Max(0, [Math]::Floor(($screen.Width - $width) / 2) + $screen.Left)
    $y = [Math]::Max(0, [Math]::Floor(($screen.Height - $height) / 2) + $screen.Top)
    
    Write-Output "moving window to X=$x, Y=$y (Width=$width, Height=$height)"
    
    [Win32]::MoveWindow($hwnd, $x, $y, $width, $height, $true) | Out-Null
    
    $clickX = $x + 75
    $clickY = $y + 75

    Start-Sleep -Milliseconds 100
    
    Write-Output "clicking near top-left of window: X=$clickX Y=$clickY"
    for ($i = 0; $i -lt 3; $i++) {
        Start-Sleep -Milliseconds 50
        [Win32]::SetCursorPos([int]$clickX, [int]$clickY) | Out-Null
        [Win32]::mouse_event(0x0002, 0, 0, 0, 0)
        [Win32]::mouse_event(0x0004, 0, 0, 0, 0)
    }

    Start-Sleep -Milliseconds 50

    Write-Output "pressing tab 3 times"
    for ($i = 0; $i -lt 3; $i++) {
        Start-Sleep -Milliseconds 50
        [Win32]::keybd_event(0x09, 0, 0, 0)
        [Win32]::keybd_event(0x09, 0, 2, 0)
    }

    Start-Sleep -Milliseconds 50
    
    Write-Output "entering username"
    [System.Windows.Forms.SendKeys]::SendWait($username)

    Start-Sleep -Milliseconds 50
    
    Write-Output "pressing tab"
    [Win32]::keybd_event(0x09, 0, 0, 0)
    [Win32]::keybd_event(0x09, 0, 2, 0)

    Start-Sleep -Milliseconds 50
    
    Write-Output "entering password"
    [System.Windows.Forms.SendKeys]::SendWait($password)

    Start-Sleep -Milliseconds 50
    
    Write-Output "pressing enter"
    [Win32]::keybd_event(0x0D, 0, 0, 0)
    [Win32]::keybd_event(0x0D, 0, 2, 0)

    Write-Output "script execution complete"
    Write-Output "-----"
    
} else {
    Write-Output "ERROR: No window found matching `"Riot`""
}
