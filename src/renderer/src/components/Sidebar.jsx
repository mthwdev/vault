import AccountTab from "./AccountTab";

export default function Sidebar() {
	return (
		<>
			<div className="flex flex-col w-40 border-r border-b h-full">
				<AccountTab accountName="Account 1" region="EUW" />
				<AccountTab accountName="Account 2" region="NA" />
				<AccountTab accountName="Account 3" region="OCE" />
			</div>
		</>
	);
}
