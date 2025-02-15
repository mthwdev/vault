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

	function handleLogin() {
		console.log("login -");
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
					<div className="flex justify-between w-full">
						<EditAccountForm
							selectedAccount={selectedAccount}
							fetchAccounts={fetchAccounts}
						/>
						<button
							className="w-24 h-10 bg-black text-white rounded-full mr-8 mt-4"
							onClick={handleLogin}
						>
							login
						</button>
					</div>
				)}
			</div>
		</>
	);
}
