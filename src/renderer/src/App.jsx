import Sidebar from "./components/Sidebar";
import AddAccountForm from "./components/AddAccountForm";
import EditAccountForm from "./components/EditAccountForm";
import { useState, useEffect } from "react";

export default function App() {
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [accounts, setAccounts] = useState([]);

	async function fetchAccounts() {
		try {
			const data = await window.electronAPI.getAccounts();
			setAccounts(data);

			if (selectedAccount) {
				const updatedAccount = data.find(
					(acc) => acc.id === selectedAccount.id
				);
				setSelectedAccount(updatedAccount || null);
			}
		} catch (error) {
			console.error("error fetching accounts:", error);
		}
	}

	useEffect(() => {
		fetchAccounts();
	}, []);

	function handleLogin() {
		window.electronAPI.loginRiot(selectedAccount);
	}
	return (
		<>
			<div className="flex w-full h-full">
				<Sidebar
					selectedAccount={selectedAccount}
					setSelectedAccount={setSelectedAccount}
					accounts={accounts}
				/>
				{selectedAccount === "add" && (
					<AddAccountForm fetchAccounts={fetchAccounts} />
				)}
				{selectedAccount !== null && selectedAccount !== "add" && (
					<div className="flex flex-col h-full w-full">
						<EditAccountForm
							selectedAccount={selectedAccount}
							fetchAccounts={fetchAccounts}
						/>
						<div className="flex ml-4 mt-auto mb-14">
							<button
								className="w-24 h-10 bg-black text-white rounded-full hover:bg-white hover:text-black hover:border-2 hover:border-black cursor-pointer"
								onClick={handleLogin}
							>
								login
							</button>
							<p className="ml-4 mt-2">
								(make sure riot client is opened)
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
