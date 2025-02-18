export default function AccountTab({ displayName, note, isSelected, onClick }) {
	return (
		<>
			<div
				onClick={onClick}
				className={`min-h-20 min-w-48 transition-colors duration-200 cursor-pointer border-black border-b ${
					isSelected
						? "bg-black text-white"
						: " hover:bg-black hover:text-white"
				}`}
			>
				<div className="ml-2 mt-2">
					<p>{displayName}</p>
					{note ? (
						<p className="font-bold">
							note:{" "}
							{<p className="font-normal inline-block">{note}</p>}
						</p>
					) : null}
				</div>
			</div>
		</>
	);
}
