import Sidebar from "./components/Sidebar";
import AddAccountForm from "./components/addAccountForm";
import { useState } from "react";

export default function App() {
	const [selectedAccount, setSelectedAccount] = useState(null);
	return (
		<>
			<div className="flex w-full h-full">
				<Sidebar
					selectedAccount={selectedAccount}
					setSelectedAccount={setSelectedAccount}
				/>
				{selectedAccount === "add" && <AddAccountForm />}
				{selectedAccount !== null && selectedAccount !== "add" && (
					<p>meow</p>
				)}
			</div>
		</>
	);
}
