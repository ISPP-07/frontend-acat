import React from 'react'
import Link from 'next/link'

function RegisterInterventionModal({ searchParams }) {
	const show = searchParams?.show
	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
			<div className="p-8 border w-[32rem] h-fit shadow-lg rounded-md bg-white">
				<div>
					<div className="mt-2 px-10 py-3">
						<div className="group relative">
							<strong className="text-2xl text-gray-700  border-black-300 rounded-md h-8 w-full mt-2">
								Registro de intervención
							</strong>
						</div>
						<form>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Nombre</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/user.svg"
											alt="face"
											className="h-full w-full object-cover"
										/>
									</div>
									<input
										className="border-2 border-gray-300 rounded-md h-8 flex-grow"
										type="text"
									/>
								</div>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">
									Fecha de atención
								</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/calendar.svg"
											alt="calendar"
											className="h-full w-full object-cover"
										/>
									</div>
									<input
										className="border-2 border-gray-300 rounded-md h-8 flex-grow"
										type="date"
									/>
								</div>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Tipología</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/align-3-vertical.svg"
											alt="tipologia"
											className="h-full w-full object-cover"
										/>
									</div>
									<input
										className="border-2 border-gray-300 rounded-md h-8 flex-grow"
										type="text"
									/>
								</div>
							</fieldset>

							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Técnico</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/gear-2.svg"
											alt="gear"
											className="h-full w-full object-cover"
										/>
									</div>
									<input
										className="border-2 border-gray-300 rounded-md h-8 flex-grow"
										type="text"
									/>
								</div>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Motivo</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/bookmark.svg"
											alt="gear"
											className="h-full w-full object-cover"
										/>
									</div>
									<input
										className="border-2 border-gray-300 rounded-md h-8 flex-grow"
										type="text"
									/>
								</div>
							</fieldset>
							<fieldset className="flex flex-col mt-5">
								<label className="text-gray-700 font-bold">Observaciones</label>
								<div className="flex items-center">
									<div className="w-8 h-8 mr-2">
										<img
											src="/msg-bubble-user.svg"
											alt="gear"
											className="h-full w-full object-cover"
										/>
									</div>
									<textarea
										className="border-2 border-gray-300 rounded-md flex-grow"
										type="text"
									/>
								</div>
							</fieldset>
						</form>
					</div>
					<div className="flex justify-center mt-4">
						<Link
							href="/interventions"
							className="px-4 py-2 w-72 shadow-lg text-center bg-[#75AF73] text-white text-base font-medium rounded-md hover:bg-[#557e53] flex-grow focus:outline-none focus:ring-2 focus:ring-gray-300"
						>
							Dar de Alta
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterInterventionModal
