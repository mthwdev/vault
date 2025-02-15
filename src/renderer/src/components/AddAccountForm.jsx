import { useState } from "react";

export default function AddAccountForm({ fetchAccounts }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		displayName: "",
	});

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		await window.electronAPI.addAccount(formData);
		await fetchAccounts();
	}

	return (
		<form onSubmit={handleSubmit} className="mt-8 ml-8">
			<div className="mb-4">
				<label htmlFor="username" className="block">
					Username
				</label>
				<input
					id="username"
					type="text"
					value={formData.username}
					onChange={handleChange}
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="password" className="block">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="displayName" className="block">
					Display Name
				</label>
				<input
					id="displayName"
					type="text"
					value={formData.displayName}
					onChange={handleChange}
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<button
				type="submit"
				className="w-24 h-10 bg-black text-white rounded-full mt-2"
			>
				add
			</button>
		</form>
	);
}
