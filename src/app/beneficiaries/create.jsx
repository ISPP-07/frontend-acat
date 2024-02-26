'use client'
import Phone from '../components/icons/phone'
import Location2 from '../components/icons/location-2'
import User from '../components/icons/user'
import UserLaptop from '../components/icons/user-laptop'
import Clipboard from '../components/icons/clipboard'
import Identification from '../components/icons/id'
import Gender from '../components/icons/gender'
import { useRouter } from 'next/navigation'

const axios = require('axios').default

export default function CreateModal({ isVisible, onClose }) {
	if (!isVisible) return null

	const toClose = x => {
		if (x.target.id === 'close') {
			onClose()
		}
	}

	const router = useRouter()
	async function onSubmit(event) {
		event.preventDefault()
		// TODO: waiting for creation API implementation
		const formData = new FormData(event.target)
		axios
			.post(
				'https://65dc59f1e7edadead7ebb34d.mockapi.io/api/v1/beneficiary',
				formData
			)
			.then(function (response) {
				// Navigate to the newly created beneficiary
				router.push('/beneficiaries/' + response.data.id.toString())
			})
			.catch(function (error) {
				// TODO: handle error
				console.log(error)
			})
	}

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
			id="close"
			onClick={toClose}
		>
			<div className="w-[600px] h-[200px] ">
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
								<User />
								<input
									type="text"
									name="name"
									placeholder="Usuario"
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
									placeholder="DNI"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="birthdate">
								<strong>Fecha de nacimiento</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<input type="date" name="birthdate" className="p-1 w-full" />
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
									placeholder="Dirección"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="gender">
								<strong>Sexo</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Gender />
								<input
									type="text"
									name="gender"
									placeholder="Sexo"
									className="p-1 w-full"
								/>
							</div>
						</div>
						<div>
							<label htmlFor="telephone">
								<strong>Teléfono</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<Phone />
								<input
									type="text"
									name="telephone"
									placeholder="Teléfono"
									className="p-1 w-full"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="firstTimeAttended">
								<strong>Primera atención</strong>
							</label>
							<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
								<input
									type="date"
									name="firstTimeAttended"
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
							<label htmlFor="observations">
								<strong>Observaciones</strong>
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
