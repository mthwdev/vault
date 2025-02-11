import AccountTab from "./AccountTab";

export default function Sidebar() {
	const accounts = [
		{
			id: 1,
			displayName: "Account 1",
		},
		{
			id: 2,
			displayName: "Account 2",
		},
		{
			id: 3,
			displayName: "Account 2",
		},
	];
	return (
		<>
			<div className="flex flex-col w-48 border-r border-b h-full">
				<div className="border-b min-h-20 min-w-48 hover:bg-gray-400 transition-colors duration-200 cursor-pointer flex items-center justify-center">
					<div className="h-12 w-12 rounded-full border-dashed border-2 flex items-center justify-center">
						<div className="text-xl font-bold">+</div>
					</div>
				</div>
				{accounts.map((account) => (
					<AccountTab
						key={account.id}
						displayName={account.displayName}
					/>
				))}
			</div>
		</>
	);
}
