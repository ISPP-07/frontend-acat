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
	const [errors, setErrors] = useState(null)
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
		formData.date = formData.date ? new Date(formData.date).toISOString() : null

		// Validate the form
		if (!validateForm(formData)) {
			return
		}

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
					`Ha habido un error al crear al nuevo beneficiario: ${error.response.data.detail[0].msg}`
				)
			})
	}

	const validateForm = formData => {
		let valid = true
		const newError = {}

		const date = new Date(formData.date)

		if (date && date > new Date()) {
			newError.date = 'La fecha no puede ser futura'
			valid = false
		}

		setErrors(newError)
		return valid
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataBeneficiaries(null, 0)
				setBeneficiaryOptions(
					data.elements.map(beneficiary => ({
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
			className='fixed top-0 left-0 bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50'
			id='close'
		>
			{' '}
			<div className='p-10 border h-fit shadow-lg rounded-xl bg-white font-Varela text-black'>
				<div className='flex justify-end'>
					<button
						onClick={onClickFunction}
						className='bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3'
					>
						X
					</button>
				</div>

				<h1 className='text-center font-poppins text-2xl'>
					<strong>Registro de Intervenciones</strong>
				</h1>
				<form
					className='flex flex-row flex-wrap justify-center max-w-[330px] gap-3 mt-2'
					onSubmit={handleAddIntervention}
				>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='name' className='hidden md:block text-black'>
							<span>Nombre</span> <span className='text-red-500'>*</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<User className='ml-1' />
							<Select
								className='border-0 w-full'
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
								classNamePrefix='Selecciona un beneficiario'
								isDisabled={false}
								isLoading={false}
								isClearable={true}
								isRtl={false}
								isSearchable={true}
								name='patient_id'
								options={beneficiaryOptions}
								onChange={opt =>
									setFormData({
										...formData,
										patient_id: opt?.value ? opt.value : null
									})
								}
								required={true}
							/>
						</div>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='tipology' className='hidden md:block text-black'>
							<span>Tipologia</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<Pen3 />
							<select
								name='typology'
								value={formData.typology}
								onChange={handleInputChange}
								className='flex items-center rounded-xl p-1 pl-6 w-full bg-white'
							>
								<option value='Otro'>Otro</option>
								<option value='Prevención'>Prevención</option>
								<option value='Atención'>Atención</option>
								<option value='Incorporación sociolaboral'>
									Incorporación sociolaboral
								</option>
							</select>
						</div>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='birthdate' className='hidden md:block text-black'>
							<span>Fecha de atencion</span>{' '}
							<span className='text-red-500'>*</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<input
								type='datetime-local'
								name='date'
								id='date'
								onChange={handleInputChange}
								className='items-center rounded-xl p-1 w-full'
								required={true}
							/>
						</div>
						<span className='text-red-500 text-sm'>{errors?.date}</span>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label htmlFor='technician' className='hidden md:block text-black'>
							<span>Técnico</span> <span className='text-red-500'>*</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<UserLaptop />
							<input
								type='text'
								name='technician'
								value={formData.technician}
								onChange={handleInputChange}
								placeholder='Técnico que lo ha atendido'
								className='flex items-center rounded-xl p-1 pl-6 w-full'
								required={true}
							/>
						</div>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label
							htmlFor='observations'
							className='hidden md:block text-black'
						>
							<span>Motivo</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<Clipboard />
							<input
								type='text'
								name='reason'
								value={formData.reason}
								onChange={handleInputChange}
								placeholder='Razón de la intervención'
								className='flex items-center rounded-xl p-1 pl-6 w-full'
							/>
						</div>
					</fieldset>
					<fieldset className='flex flex-col w-full'>
						<label
							htmlFor='observations'
							className='hidden md:block text-black'
						>
							<span>Observaciones</span>
						</label>
						<div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
							<Clipboard />
							<input
								type='text'
								name='observations'
								value={formData.observations}
								onChange={handleInputChange}
								placeholder='Observaciones sobre el beneficiario'
								className='flex items-center rounded-xl p-1 pl-6 w-full'
							/>
						</div>
					</fieldset>
					<div className='flex justify-center w-full mt-6'>
						<input
							data-testid='submit'
							type='submit'
							className='bg-green-500 rounded-md drop-shadow-lg p-2 cursor-pointer text-white w-full'
							value='Registrar'
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterInterventionModal
