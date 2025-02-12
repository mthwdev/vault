export default function AddAccountForm() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<form onSubmit={handleSubmit} className="mt-8 ml-8">
			<div className="mb-4">
				<label for="username" className="block">
					Username
				</label>
				<input
					id="username"
					type="text"
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<div className="mb-4">
				<label for="password" className="block">
					Password
				</label>
				<input
					id="password"
					type="password"
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<div className="mb-4">
				<label for="displayName" className="block">
					Display Name
				</label>
				<input
					id="displayName"
					type="text"
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<button
				type="submit"
				className="w-24 h-10 bg-black text-white rounded-full mt-2"
			>
				save
			</button>
		</form>
	);
}
