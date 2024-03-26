/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function ModalConfirmation({
	title,
	message,
	handleConfirm,
	handleCancel,
	confirmText = 'Sí',
	cancelText = 'No'
}) {
	return (
		<div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white w-2/3 md:w-1/3 px-5 py-7 rounded-lg shadow-lg">
				<h2 className="text-xl font-bold text-center">{title}</h2>
				<p className="text-sm md:text-lg text-center mt-2">{message}</p>
				<div className="flex justify-center mt-4">
					<button
						className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mr-2"
						onClick={handleConfirm}
					>
						{confirmText}
					</button>
					<button
						className="border border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg"
						onClick={handleCancel}
					>
						{cancelText}
					</button>
				</div>
			</div>
		</div>
	)
}
