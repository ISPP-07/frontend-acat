'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function CreateModal({ closeModal }) {
	return (
		<div
			className="fixed top-0 left-0 bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50"
			id="close"
		>
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white font-Varela text-black">
				<div className="flex justify-end">
					<button
						onClick={closeModal}
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
					>
						X
					</button>
				</div>
				<form className="flex flex-col md:flex-row md:flex-wrap justify-center max-w-[600px] gap-3 mt-2">
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="name" className="hidden md:block text-black">
							Nombre
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
								/>
							</svg>
							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="Nombre"
								id="name"
								name="name"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="dni" className="hidden md:block text-black">
							DNI
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
								/>
							</svg>
							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="DNI"
								id="dni"
								name="dni"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="fecha-nacimiento" className="text-black">
							Fecha de nacimiento
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<input
								className="flex items-center rounded-xl p-1 w-full"
								type="date"
								id="fecha-nacimiento"
								name="fecha-nacimiento"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="direccion" className="hidden md:block text-black">
							Dirección
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
								/>
							</svg>

							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="Dirección"
								id="direccion"
								name="direccion"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="sexo" className="hidden md:block text-black">
							Sexo
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
								/>
							</svg>

							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="Sexo"
								id="sexo"
								name="sexo"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="telefono" className="hidden md:block text-black">
							Teléfono
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
								/>
							</svg>

							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="tel"
								placeholder="Teléfono"
								id="telefono"
								name="telefono"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="primera-atencion" className="text-black">
							Primera atención
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<input
								className="flex items-center rounded-xl p-1 w-full"
								type="date"
								id="primera-atencion"
								name="primera-atencion"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-5/12">
						<label htmlFor="tecnico" className="hidden md:block text-black">
							Técnico
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
								/>
							</svg>

							<input
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="Técnico"
								id="tecnico"
								name="tecnico"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full md:w-10/12">
						<label
							htmlFor="observaciones"
							className="hidden md:block text-black"
						>
							Observaciones
						</label>
						<div className="relative flex items-start border-2 rounded-xl border-gray-200 bg-white">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4 absolute top-1 left-0 m-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
								/>
							</svg>

							<textarea
								className="flex items-center rounded-xl p-1 pl-6 w-full"
								type="text"
								placeholder="Observaciones"
								id="observaciones"
								name="observaciones"
							/>
						</div>
					</fieldset>
					<div className="flex justify-center w-full mt-6">
						<button
							className="bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center"
							onClick={closeModal}
						>
							Dar de alta
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
