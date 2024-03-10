/* eslint-disable no-unused-vars */
'use client'
import Pen3 from '../components/icons/pen-3'
import User from '../components/icons/user'
import UserLaptop from '../components/icons/user-laptop'
import Clipboard from '../components/icons/clipboard'

/* eslint-disable no-unused-vars */
import React from 'react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
/* eslint-enable no-unused-vars */

// const axios = require('axios').default

function RegisterInterventionModal({ isVisible, onClose }) {
	if (!isVisible) return null

	// const router = useRouter()
	async function onSubmit(event) {
		event.preventDefault()
		// TODO: waiting for creation API implementation
		// const formData = new FormData(event.target)
		// axios
		// 	.post(
		// 		'https://65dc59f1e7edadead7ebb34d.mockapi.io/api/v1/interventions',
		// 		formData
		// 	)
		// 	.then(function (response) {
		// 		// Navigate to the newly created beneficiary
		// 		router.push('/interventions/' + response.data.id.toString())
		// 	})
		// 	.catch(function (error) {
		// 		// TODO: handle error
		// 		console.log(error)
		// 	})
	}
	const closedModal = () => {
		window.location.href = '/interventions'
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-30"
			id="close"
			onClick={closedModal}
		>
			<div className="w-96 p-8 bg-white rounded-xl space-y-6">
				<button className="text-gray-500 text-xl l" onClick={onClose}>
					X
				</button>

				<h1 className="text-center font-poppins text-2xl">
					<strong>Registro de Intervenciones</strong>
				</h1>
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label htmlFor="name" className="block">
							<strong>Nombre</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<User height="18" width="18" />
							<input
								type="text"
								name="name"
								placeholder="Usuario"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<div>
						<label htmlFor="tipologia" className="block">
							<strong>Tipologia</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<Pen3 />
							<input
								type="text"
								name="Tipologia"
								placeholder="tipologia"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<div>
						<label htmlFor="birthdate" className="block">
							<strong>Fecha de atencion</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<input type="date" name="birthdate" className="p-1 w-full" />
						</div>
					</div>
					<div>
						<label htmlFor="technician" className="block">
							<strong>Técnico</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<UserLaptop />
							<input
								type="text"
								name="technician"
								placeholder="Técnico que lo ha atendido"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<div>
						<label htmlFor="observations" className="block">
							<strong>Motivo</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<Clipboard />
							<input
								type="text"
								name="observations"
								placeholder="Observaciones sobre el beneficiario"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<div>
						<label htmlFor="observations" className="block">
							<strong>Observaciones</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<Clipboard />
							<input
								type="text"
								name="observations"
								placeholder="Motivo"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="bg-blue-600 rounded-md drop-shadow-lg p-2 cursor-pointer text-white w-full"
						onClick={closedModal}
					>
						Registrar
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegisterInterventionModal
