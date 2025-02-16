const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	getAccounts: () => ipcRenderer.invoke("get-accounts"),
	addAccount: (accountData) => ipcRenderer.invoke("add-account", accountData),
	updateAccount: (accountId, accountData) =>
		ipcRenderer.invoke("update-account", accountId, accountData),
	loginRiot: (account) => ipcRenderer.invoke("login-riot", account),
});
