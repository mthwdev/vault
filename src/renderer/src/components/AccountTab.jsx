export default function AccountTab({ displayName }) {
	return (
		<>
			<div className="border-b min-h-20 min-w-48 hover:bg-gray-400 transition-colors duration-200 cursor-pointer">
				<div className="ml-2 mt-2">
					<p>{displayName}</p>
				</div>
			</div>
		</>
	);
}
