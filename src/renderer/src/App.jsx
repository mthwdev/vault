import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function App() {
	const [selectedAccount, setSelectedAccount] = useState(null);
	return (
		<>
			<Sidebar
				selectedAccount={selectedAccount}
				setSelectedAccount={setSelectedAccount}
			/>
		</>
	);
}
