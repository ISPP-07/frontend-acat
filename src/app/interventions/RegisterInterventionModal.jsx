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
		<div
			className="fixed top-0 left-0 bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50"
			id="close"
		>
			{' '}
			<div className="p-10 border h-fit shadow-lg rounded-xl bg-white font-Varela text-black">
				<div className="flex justify-end">
					<button
						onClick={onClickFunction}
						className="bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3"
					>
						X
					</button>
				</div>

				<h1 className="text-center font-poppins text-2xl">
					<strong>Registro de Intervenciones</strong>
				</h1>
				<form className="flex flex-row flex-wrap justify-center max-w-[330px] gap-3 mt-2">
					<fieldset className="flex flex-col w-full">
						<label htmlFor="name" className="hidden md:block text-black">
							<strong>Nombre</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<User className="ml-1" />
							<Select
								className="border-0 w-full"
								styles={{
									control: provided => ({
										...provided,
										border: 'none',
										borderRadius: '9999px',
										boxShadow: 'none',
										width: '100%'
									}),
									menu: provided => ({
										...provided,
										borderRadius: '0px'
									})
								}}
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
					</fieldset>
					<fieldset className="flex flex-col w-full">
						<label htmlFor="tipology" className="hidden md:block text-black">
							<strong>Tipologia</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<Pen3 />
							<input
								type="text"
								name="typology"
								value={formData.tipology}
								onChange={handleInputChange}
								placeholder="Tipologia"
								className="flex items-center rounded-xl p-1 pl-6 w-full"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full">
						<label htmlFor="birthdate" className="hidden md:block text-black">
							<strong>Fecha de atencion</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleInputChange}
								className="items-center rounded-xl p-1 pl-6 w-full"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full">
						<label htmlFor="technician" className="hidden md:block text-black">
							<strong>Técnico</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<UserLaptop />
							<input
								type="text"
								name="technician"
								value={formData.technician}
								onChange={handleInputChange}
								placeholder="Técnico que lo ha atendido"
								className="flex items-center rounded-xl p-1 pl-6 w-full"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full">
						<label
							htmlFor="observations"
							className="hidden md:block text-black"
						>
							<strong>Motivo</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<Clipboard />
							<input
								type="text"
								name="reason"
								value={formData.reason}
								onChange={handleInputChange}
								placeholder="Razón de la intervención"
								className="flex items-center rounded-xl p-1 pl-6 w-full"
							/>
						</div>
					</fieldset>
					<fieldset className="flex flex-col w-full">
						<label
							htmlFor="observations"
							className="hidden md:block text-black"
						>
							<strong>Observaciones</strong>
						</label>
						<div className="relative flex items-center border-2 rounded-xl border-gray-200 bg-white">
							<Clipboard />
							<input
								type="text"
								name="observations"
								value={formData.observations}
								onChange={handleInputChange}
								placeholder="Observaciones sobre el beneficiario"
								className="flex items-center rounded-xl p-1 pl-6 w-full"
							/>
						</div>
					</fieldset>
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
