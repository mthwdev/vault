import { useState, useEffect } from "react";

export default function AddAccountForm({ fetchAccounts }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		displayName: "",
		note: "",
	});

	const [validationMessage, setValidationMessage] = useState();

	useEffect(() => {
		if (validationMessage) {
			const timeout = setTimeout(() => setValidationMessage(null), 1200);
			return () => clearTimeout(timeout);
		}
	}, [validationMessage]);

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const success = await window.electronAPI.addAccount(formData);
		if (success) {
			setValidationMessage({ text: "account added", type: "success" });
		} else {
			setValidationMessage({ text: "an error occurred", type: "error" });
		}

		await fetchAccounts();
	}

	return (
		<form onSubmit={handleSubmit} className="mt-8 ml-8">
			<div className="mb-4">
				<label htmlFor="username" className="block">
					username
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
					password
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
					display name
				</label>
				<input
					id="displayName"
					type="text"
					value={formData.displayName}
					onChange={handleChange}
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="note" className="block">
					note
				</label>
				<input
					id="note"
					type="text"
					value={formData.note}
					onChange={handleChange}
					className="mt-1 p-1 border border-black"
				/>
			</div>

			<button
				type="submit"
				className="w-24 h-10 bg-black text-white rounded-full mt-2 hover:bg-white hover:text-black hover:border-2 hover:border-black cursor-pointer"
			>
				add
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
	);
}
