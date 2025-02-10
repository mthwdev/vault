export default function AccountTab(props) {
	return (
		<>
			<div className="border-b min-h-20 min-w-40 hover:bg-gray-400 transition-colors duration-200">
				<div className="ml-2 mt-2">
					<p>{props.accountName}</p>
					<p>{props.region}</p>
				</div>
			</div>
		</>
	);
}
