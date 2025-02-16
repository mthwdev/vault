import { useState, useEffect } from "react";

export default function EditAccountForm({ selectedAccount, fetchAccounts }) {
	const [formData, setFormData] = useState({
		username: selectedAccount.username,
		password: selectedAccount.password,
		displayName: selectedAccount.displayName,
	});

	const [validationMessage, setValidationMessage] = useState();

	useEffect(() => {
		setFormData({
			username: selectedAccount.username,
			password: selectedAccount.password,
			displayName: selectedAccount.displayName,
		});
	}, [selectedAccount]);

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	}
	async function handleSubmit(e) {
		e.preventDefault();

		const success = await window.electronAPI.updateAccount(
			selectedAccount.id,
			formData
		);
		if (success) {
			setValidationMessage({ text: "changes saved", type: "success" });
		} else {
			setValidationMessage({ text: "an error occurred", type: "error" });
		}

		await fetchAccounts();
	}
	return (
		<>
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
					className="w-24 h-10 bg-black text-white rounded-full mt-2 hover:bg-white hover:text-black hover:border-2 hover:border-black cursor-pointer"
				>
					save
				</button>
				{validationMessage && (
					<p
						className={`mt-2 ${
							validationMessage.type === "success"
								? "text-green-500"
								: "text-red-500"
						}`}
					>
						{validationMessage.text}
					</p>
				)}
			</form>
		</>
	);
}
