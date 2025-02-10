import { BrowserWindow, app } from "electron";

function createMainWindow() {
	const mainWindow = new BrowserWindow({
		title: "vault",

		width: 800,
		height: 600,
	});
	mainWindow.loadURL("http://localhost:5173/");
}

app.whenReady().then(createMainWindow);
