const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	getAccounts: () => ipcRenderer.invoke("get-accounts"),
	addAccount: (accountData) => ipcRenderer.invoke("add-account", accountData),
});
