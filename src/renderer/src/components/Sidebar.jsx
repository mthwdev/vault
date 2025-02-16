import AccountTab from "./AccountTab";

export default function Sidebar({
	selectedAccount,
	setSelectedAccount,
	accounts,
}) {
	return (
		<>
			<div className="flex flex-col min-w-50 border-r h-full overflow-auto">
				<div
					onClick={() => setSelectedAccount("add")}
					className={`min-h-20 min-w-48 transition-colors duration-200 cursor-pointer flex items-center justify-center border-black border-b  ${
						selectedAccount === "add"
							? "bg-black text-white"
							: " hover:bg-black hover:text-white"
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
