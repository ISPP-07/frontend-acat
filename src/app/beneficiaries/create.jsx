'use client'
import Phone from '../components/icons/phone'
import Location2 from '../components/icons/location-2'
import User from '../components/icons/user'
import UserLaptop from '../components/icons/user-laptop'
import Clipboard from '../components/icons/clipboard'
import Identification from '../components/icons/id'
import Gender from '../components/icons/gender'
/* eslint-disable no-unused-vars */
import React from 'react'
import { useRouter } from 'next/navigation'
/* eslint-enable no-unused-vars */

// const axios = require('axios').default

export default function CreateModal({ isVisible, onClose }) {
	if (!isVisible) return null

	const toClose = x => {
		if (x.target.id === 'close') {
			onClose()
		}
	}

	const router = useRouter()

	function getCurrentDate() {
		const currentDate = new Date()
		const year = currentDate.getFullYear()
		const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
		const day = String(currentDate.getDate()).padStart(2, '0')

		return `${year}-${month}-${day}`
	}

	const formattedDate = getCurrentDate()

	async function onSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)
		// WARNING this might be deleted in future development
		formData.append('registration_date', formattedDate)
		formData.append('age', '0')
		// up until here
		const object = {}
		formData.forEach((value, key) => (object[key] = value))
		const json = JSON.stringify(object)
		axios
			.post(process.env.NEXT_PUBLIC_BASE_URL + '/acat/patient', json, {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				// Navigate to the newly created beneficiary
				onClose()
				router.push('/beneficiaries/' + response.data.id.toString())
			})
			.catch(function (error) {
				alert(
					`Ha habido un error al crear al nuevo beneficiario: ${error.response.data.detail}`
				)
			})
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
			id="close"
			onClick={toClose}
		>
			<div>
				<button className="text-gray-500 text-xl" onClick={onClose}>
					X
				</button>
				<div className="bg-white p-4 rounded-3xl text-black font-Varela">
					<h1 className="mb-10 text-center font-poppins text-2xl">
						<strong>Registro de Beneficiarios</strong>
					</h1>
					<form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="name">
								<strong>Nombre</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<User height="18" width="18" />
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Usuario"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="first_surname">
								<strong>Primer apellido</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<User height="18" width="18" />
								<input
									type="text"
									name="first_surname"
									id="first_surname"
									placeholder="Primer apellido"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="second_surname">
								<strong>Segundo apellido</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<User height="18" width="18" />
								<input
									type="text"
									name="second_surname"
									id="second_surname"
									placeholder="Segundo apellido"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="alias">
								<strong>Alias</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<User height="18" width="18" />
								<input
									type="text"
									name="alias"
									id="alias"
									placeholder="Alias"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="dni">
								<strong>DNI</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Identification />
								<input
									type="text"
									name="dni"
									id="dni"
									placeholder="DNI"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="dossier_number">
								<strong>Numero de registro</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Identification />
								<input
									type="text"
									name="dossier_number"
									id="dossier_number"
									placeholder="Numero de registro"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="birth_date">
								<strong>Fecha de nacimiento</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<input
									type="date"
									name="birth_date"
									id="birth_date"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="address">
								<strong>Dirección</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Location2 />
								<input
									type="text"
									name="address"
									id="address"
									placeholder="Dirección"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="sex">
								<strong>Sexo</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Gender />
								<input
									type="text"
									name="sex"
									id="sex"
									placeholder="Sexo"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="contact_phone">
								<strong>Teléfono de contacto</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Phone />
								<input
									type="text"
									name="contact_phone"
									id="contact_phone"
									placeholder="Teléfono"
									className="p-1 w-full"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="first_appointment_date">
								<strong>Primera atención</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<input
									type="date"
									name="first_appointment_date"
									id="first_appointment_date"
									className="p-1 w-full"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="technician">
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

						<div className="col-span-2">
							<label htmlFor="observation_text">
								<strong>Observaciones</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Clipboard />
								<input
									type="text"
									name="observation_text"
									id="observation_text"
									placeholder="Observaciones sobre el beneficiario"
									className="p-1 w-full"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="col-span-2 bg-blue-600 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-full"
						>
							Registrar
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
