import AccountTab from "./AccountTab";

export default function Sidebar({
	selectedAccount,
	setSelectedAccount,
	accounts,
}) {
	return (
		<>
			<div className="flex flex-col w-48 border-r h-full overflow-auto">
				<div
					onClick={() => setSelectedAccount("add")}
					className={`border-b min-h-20 min-w-48 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
						selectedAccount === "add"
							? "bg-gray-500"
							: "hover:bg-gray-400"
					}`}
				>
					<div className="h-12 w-12 rounded-full border-dashed border-2 flex items-center justify-center">
						<div className="text-xl font-bold">+</div>
					</div>
				</div>
				{accounts.map((account) => (
					<AccountTab
						key={account.id}
						displayName={account.displayName}
						isSelected={selectedAccount?.id === account.id}
						onClick={() => setSelectedAccount(account)}
					/>
				))}
			</div>
		</>
	);
}
