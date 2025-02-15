import Sidebar from "./components/Sidebar";
import AddAccountForm from "./components/AddAccountForm";
import EditAccountForm from "./components/EditAccountForm";
import { useState, useEffect } from "react";

export default function App() {
	const [selectedAccount, setSelectedAccount] = useState(null);
	const [accounts, setAccounts] = useState([]);

	const fetchAccounts = async () => {
		try {
			const data = await window.electronAPI.getAccounts();
			setAccounts(data);
		} catch (error) {
			console.error("error fetching accounts:", error);
		}
	};

	useEffect(() => {
		fetchAccounts();
	}, []);

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
					<EditAccountForm selectedAccount={selectedAccount} />
				)}
			</div>
		</>
	);
}
