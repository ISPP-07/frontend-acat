'use client'
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Pen3 from '../components/icons/pen-3'
import User from '../components/icons/user'
import UserLaptop from '../components/icons/user-laptop'
import Clipboard from '../components/icons/clipboard'
import axios from 'axios'
import Select from 'react-select'
import { fetchDataBeneficiaries } from '../beneficiaries/fetch'
import { useRouter } from 'next/navigation'

function RegisterInterventionModal({ onClickFunction }) {
	// if (!isVisible) return null
	const router = useRouter()

	const [formData, setFormData] = useState({
		date: '',
		reason: '',
		typology: '',
		observations: '',
		patient_id: '',
		technician: ''
	})

	const [beneficiaryOptions, setBeneficiaryOptions] = useState([])

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

	async function handleAddIntervention(event) {
		event.preventDefault()

		axios
			.post(`${BASEURL}/acat/intervention`, JSON.stringify(formData), {
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				// Navigate to the newly created beneficiary
				router.push('/interventions/' + response.data.id.toString())
			})
			.catch(function (error) {
				alert(
					`Ha habido un error al crear al nuevo beneficiario: ${error.response.data.detail}`
				)
			})
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataBeneficiaries()
				setBeneficiaryOptions(
					data.map(beneficiary => ({
						value: beneficiary.id,
						label: beneficiary.name
					}))
				)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	return (
		<div className="fixed bg-gray-600 bg-opacity-50 h-full w-full flex font-Varela items-center justify-center z-50">
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white max-h-full overflow-y-auto space-y-6">
				<div className="flex justify-end">
					<button
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
						onClick={onClickFunction}
					>
						X
					</button>
				</div>

				<h1 className="text-center font-poppins text-2xl">
					<strong>Registro de Intervenciones</strong>
				</h1>
				<form className="space-y-4">
					<div>
						<label className="block">
							<strong>Nombre</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<User height="18" width="18" />
							<Select
								className="p-1 w-full"
								classNamePrefix="Selecciona un beneficiario"
								defaultValue={{ label: 'Selecciona un beneficiario', value: 0 }}
								isDisabled={false}
								isLoading={false}
								isClearable={true}
								isRtl={false}
								isSearchable={true}
								name="patient_id"
								options={beneficiaryOptions}
								onChange={opt =>
									setFormData({
										...formData,
										patient_id: opt?.value ? opt.value : null
									})
								}
							/>
						</div>
					</div>
					<div>
						<label className="block">
							<strong>Tipologia</strong>
						</label>
						<div className="flex items-center border-2 rounded-md border-gray-200 bg-white">
							<Pen3 />
							<input
								type="text"
								name="typology"
								value={formData.tipology}
								onChange={handleInputChange}
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
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleInputChange}
								className="p-1 w-full"
							/>
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
								value={formData.technician}
								onChange={handleInputChange}
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
								name="reason"
								value={formData.reason}
								onChange={handleInputChange}
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
								value={formData.observations}
								onChange={handleInputChange}
								placeholder="Motivo"
								className="p-1 w-full"
							/>
						</div>
					</div>
					<div className="flex justify-center w-full mt-6">
						<input
							type="submit"
							className="bg-green-500 rounded-md drop-shadow-lg p-2 cursor-pointer text-white w-full"
							onClick={handleAddIntervention}
							value="Registrar"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterInterventionModal
