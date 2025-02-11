export default function AccountTab({ displayName, isSelected, onClick }) {
	return (
		<>
			<div
				onClick={onClick}
				className={`border-b min-h-20 min-w-48 transition-colors duration-200 cursor-pointer ${
					isSelected ? "bg-gray-500 text-white" : "hover:bg-gray-400"
				}`}
			>
				<div className="ml-2 mt-2">
					<p>{displayName}</p>
				</div>
			</div>
		</>
	);
}
