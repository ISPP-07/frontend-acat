'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../../app/components/sidebar'
import Image from 'next/image'
import ButtonIcon from '../../components/buttonIcon'
import ButtonText from '../../components/buttonText'
import { fetchDataBeneficiary } from './fetch'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ModalConfirmation from '../../../app/components/modalConfirmation'

export default function BeneficiaryDetails({ params }) {
	const [beneficiary, setBeneficiary] = useState(null)
	const [toggleEditView, setToggleEditView] = useState(false)
	const [toggleDeleteView, setToggleDeleteView] = useState(false)
	const [errors, setErrors] = useState(null)
	const router = useRouter()

	const fetchData = async () => {
		try {
			const beneficiary = await fetchDataBeneficiary(
				params.beneficiaryId,
				params.url
			)
			setBeneficiary(beneficiary)
		} catch (error) {
			console.error('Error al cargar los datos:', error)
			alert(
				'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
			)
		}
	}

	const handleToggle = event => {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		const jsonData = {
			is_rehabilitated: event.target.checked
		}
		const toggle = document.getElementById('toggle')

		if (event.target.checked) {
			toggle.classList.remove('bg-gray-300')
			toggle.classList.add('bg-blue-600')
		} else {
			toggle.classList.remove('bg-blue-600')
			toggle.classList.add('bg-gray-300')
		}

		axios
			.patch(BASEURL + '/acat/patient/' + params.beneficiaryId, jsonData)
			.then(_ => {
				fetchData()
			})
			.catch(error => {
				console.error('Error al enviar los datos:', error)
				alert(
					'Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.'
				)
			})
	}

	function editView() {
		setToggleEditView(!toggleEditView)
	}

	function deleteView() {
		setToggleDeleteView(!toggleDeleteView)
	}

	function deleteBeneficiary() {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		axios
			.delete(BASEURL + '/acat/patient/' + params.beneficiaryId)
			.then(_ => {
				router.push('/beneficiaries')
			})
			.catch(error => {
				console.error('Error al eliminar el beneficiario:', error)
				alert(
					'Se produjo un error al eliminar el beneficiario. Por favor, inténtalo de nuevo.'
				)
			})
	}

	const validateForm = formData => {
		let valid = true
		const newError = {}

		const contactPhoneRegExp = /^\d{0,15}$/
		const dniRegExp = /^\d{8}[A-Z]$/
		const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
		const passportRegExp = /^[A-Z]{2}\d{7}$/

		if (!contactPhoneRegExp.test(formData.get('contact_phone'))) {
			valid = false
			newError.contact_phone = 'El teléfono no es válido'
		}

		// This is a XOR operation, if one of the three conditions is true, the result is true
		if (
			!dniRegExp.test(formData.get('nid')) ^
			!nieRegExp.test(formData.get('nid')) ^
			!passportRegExp.test(formData.get('nid'))
		) {
			if (formData.get('nid') !== '') {
				valid = false
				newError.nid =
					'El DNI/NIE/Pasaporte no coincide con el formato esperado'
			}
		}

		setErrors(newError)
		return valid
	}

	function onSubmit(event) {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		event.preventDefault()

		const formData = new FormData(event.target)

		const valid = validateForm(formData)

		if (!valid) {
			return
		}

		const jsonData = {
			name:
				formData.get('name') === '' ? beneficiary.name : formData.get('name'),
			contact_phone:
				formData.get('contact_phone') === ''
					? beneficiary.contact_phone
					: formData.get('contact_phone'),
			address:
				formData.get('address') === ''
					? beneficiary.address
					: formData.get('address'),
			dossier_number:
				formData.get('dossier_number') === ''
					? beneficiary.dossier_number
					: formData.get('dossier_number'),
			nid: formData.get('nid') === '' ? beneficiary.nid : formData.get('nid'),
			birth_date:
				formData.get('birth_date') === ''
					? beneficiary.birth_date
					: formData.get('birth_date'),
			first_technician:
				formData.get('first_technician') === ''
					? beneficiary.first_technician
					: formData.get('first_technician'),
			gender:
				formData.get('gender') === ''
					? beneficiary.gender
					: formData.get('gender'),
			observation:
				formData.get('observation') === ''
					? beneficiary.observation
					: formData.get('observation')
		}

		axios
			.patch(BASEURL + '/acat/patient/' + params.beneficiaryId, jsonData)
			.then(_ => {
				setToggleEditView(!toggleEditView)
				fetchData()
			})
			.catch(error => {
				console.error('Error al enviar los datos:', error)
				alert(
					'Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.'
				)
			})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{beneficiary &&
				(toggleEditView ? (
					<form onSubmit={onSubmit} className="w-full h-full flex">
						<div className="flex flex-col gap-4 h-screen w-[500px] bg-white border border-solid shadow-xl p-5 px-8">
							<div className="flex items-center gap-4">
								<Image
									alt="imagen-familia"
									src="/face.svg"
									width={50}
									height={50}
								/>
								<div className="flex items-center justify-between w-full">
									<span className="font-Varela text-black text-2xl font-bold">
										<input
											type="text"
											id="name"
											name="name"
											placeholder={beneficiary.name ?? 'Nombre:'}
											className="p-1 border-2 rounded-xl placeholder-black"
										/>
									</span>
									<div className="flex items-center gap-2">
										{toggleEditView ? (
											<ButtonIcon
												iconpath="/check.svg"
												iconHeight={18}
												iconWidth={18}
												color={'bg-green-500'}
												isSubmit
											/>
										) : (
											<ButtonIcon
												iconpath="/edit.svg"
												iconHeight={18}
												iconWidth={18}
												color={'bg-blue-500'}
												handleClick={editView}
											/>
										)}
										<ButtonIcon
											iconpath="/trash.svg"
											iconHeight={18}
											iconWidth={18}
											color={'bg-red-500'}
											handleClick={deleteView}
										/>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between gap-3">
								<ButtonText
									text="+ Nueva Intervención"
									color="bg-green-700"
									isRounded="true"
									px="3"
									className="shadow-2xl font-Varela text-sm text-white"
								/>
								<div className="flex justfiy-center items-center gap-2">
									<label
										htmlFor="is_rehabilitated"
										className="hover:cursor-pointer"
									>
										FINALIZADO
									</label>
									<div
										id="toggle"
										className={`border-2 rounded-full w-[50px] ${beneficiary.is_rehabilitated ? 'bg-blue-600' : 'bg-gray-300'} flex items-center`}
									>
										<input
											type="checkbox"
											name="is_rehabilitated"
											id="is_rehabilitated"
											defaultChecked={beneficiary.is_rehabilitated}
											className="relative translate-x-0 ease-in duration-150 checked:translate-x-full block w-6 h-6 rounded-full appearance-none bg-white border-4 cursor-pointer"
											onChange={handleToggle}
										/>
									</div>
								</div>
							</div>
							<hr />
							{errors?.contact_phone && (
								<span className="text-red-500">{errors.contact_phone}</span>
							)}
							<fieldset className="flex items-center gap-3">
								<label htmlFor="contact_phone">
									<Image
										alt="imagen-telefono"
										src="/phone.svg"
										width={20}
										height={20}
									/>
								</label>
								<input
									type="text"
									id="contact_phone"
									name="contact_phone"
									placeholder={beneficiary.contact_phone ?? 'Teléfono:'}
									className="p-1 border-2 rounded-xl placeholder-black"
								/>
							</fieldset>
							<fieldset className="flex items-center gap-3">
								<label htmlFor="address">
									<Image
										alt="imagen-dirección"
										src="/address.svg"
										width={20}
										height={20}
									/>
								</label>
								<input
									type="text"
									id="address"
									name="address"
									placeholder={beneficiary.address ?? 'Dirección:'}
									className="p-1 border-2 rounded-xl placeholder-black"
								/>
							</fieldset>
							<hr />
							<section className="flex flex-col gap-3">
								<fieldset className="font-Varela text-gray-800 flex items-center w-full">
									<label
										htmlFor="dossier_number"
										className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap"
									>
										Nº de expediente:
									</label>
									<input
										type="text"
										id="dossier_number"
										name="dossier_number"
										placeholder={
											beneficiary.dossier_number ?? 'Número de expediente:'
										}
										className="p-1 border-2 rounded-xl placeholder-black w-full"
									/>
								</fieldset>
								{errors?.nid && (
									<span className="text-red-500">{errors.nid}</span>
								)}
								<fieldset className="font-Varela text-gray-800 flex items-center">
									<label
										htmlFor="nid"
										className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap"
									>
										DNI:
									</label>
									<input
										type="text"
										id="nid"
										name="nid"
										placeholder={beneficiary.nid ?? 'DNI:'}
										className="p-1 border-2 rounded-xl placeholder-black w-full"
									/>
								</fieldset>
								<fieldset className="font-Varela text-gray-800 flex items-center">
									<label
										htmlFor="birth_date"
										className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap"
									>
										Fecha de nacimiento:
									</label>
									<input
										type="date"
										id="birth_date"
										name="birth_date"
										placeholder={
											beneficiary.birth_date ?? 'Fecha de nacimiento:'
										}
										value={beneficiary.birth_date}
										onChange={e =>
											setBeneficiary({
												...beneficiary,
												birth_date: e.target.value
											})
										}
										className="p-1 border-2 rounded-xl placeholder-black w-full"
									/>
								</fieldset>
								<fieldset className="font-Varela text-gray-800 flex items-center">
									<label
										htmlFor="first_technician"
										className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap"
									>
										Técnico:
									</label>
									<input
										type="text"
										id="first_technician"
										name="fist_technician"
										placeholder={beneficiary.first_technician ?? 'Técnico:'}
										className="p-1 border-2 rounded-xl placeholder-black w-full"
									/>
								</fieldset>
								<fieldset className="font-Varela text-gray-800 flex items-center">
									<label
										htmlFor="gender"
										className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap"
									>
										Sexo:
									</label>
									<select
										name="gender"
										id="gender"
										defaultValue={beneficiary.gender}
										className="p-1 border-2 rounded-xl w-full bg-white"
									>
										<option value="Man">Hombre</option>
										<option value="Woman">Mujer</option>
									</select>
								</fieldset>
								<fieldset className="font-Varela text-gray-800">
									<label
										htmlFor="observation"
										className="font-Varela text-blue-500 font-bold flex"
									>
										Observaciones:
									</label>
									<textarea
										className="font-Varela text-gray-800 mt-2 w-full border-2 rounded-xl p-1"
										id="observation"
										name="observation"
										defaultValue={beneficiary.observation}
									></textarea>
								</fieldset>
							</section>
						</div>
					</form>
				) : (
					<div className="w-full h-full flex">
						<div className="flex flex-col gap-4 h-screen w-[500px] bg-white border border-solid shadow-xl p-5 px-8">
							<div className="flex items-center gap-4">
								<Image
									alt="imagen-familia"
									src="/face.svg"
									width={50}
									height={50}
								></Image>
								<div className="flex items-center justify-between w-full">
									<span className="font-Varela text-black text-2xl font-bold">
										{beneficiary.name}
									</span>
									<div className="flex items-center gap-2">
										<ButtonIcon
											iconpath="/edit.svg"
											iconHeight={18}
											iconWidth={18}
											border={'bg-blue-500'}
											handleClick={editView}
										/>
										<ButtonIcon
											iconpath="/trash.svg"
											iconHeight={18}
											iconWidth={18}
											color={'bg-red-500'}
											handleClick={deleteView}
										/>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-between gap-3">
								<ButtonText
									text="+ Nueva Intervención"
									color="bg-green-700"
									isRounded="true"
									px="3"
									className="shadow-2xl font-Varela text-sm text-white"
								/>
								<div className="flex justfiy-center items-center gap-2">
									<span>FINALIZADO</span>
									<div
										id="toggle"
										className={`border-2 rounded-full w-[50px] ${beneficiary.is_rehabilitated ? 'bg-blue-600' : 'bg-gray-300'} flex items-center`}
									>
										<input
											type="checkbox"
											name="is_rehabilitated"
											id="is_rehabilitated"
											defaultChecked={beneficiary.is_rehabilitated}
											className="relative translate-x-0 ease-in duration-150 checked:translate-x-full block w-6 h-6 rounded-full appearance-none bg-white border-4 cursor-pointer"
											onChange={handleToggle}
										/>
									</div>
								</div>
							</div>
							<hr />
							<div className="flex items-center gap-3">
								<Image
									alt="imagen-telefono"
									src="/phone.svg"
									width={20}
									height={20}
								></Image>
								<span className="font-Varela text-gray-800 text-base">
									{beneficiary.contact_phone}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Image
									alt="imagen-dirección"
									src="/address.svg"
									width={20}
									height={20}
								></Image>
								<span className="font-Varela text-gray-800 text-base">
									{beneficiary.address}
								</span>
							</div>
							<hr />
							<section className="flex flex-col gap-3">
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold mr-2">
										Nº de expediente:
									</span>
									{beneficiary.dossier_number}
								</article>
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold mr-2">
										DNI:
									</span>
									{beneficiary.nid}
								</article>
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold mr-2">
										Fecha de nacimiento:
									</span>
									{beneficiary.birth_date} ({beneficiary.age} años)
								</article>
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold mr-2">
										Técnico:
									</span>
									{beneficiary.first_technician}
								</article>
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold mr-2">
										Sexo:
									</span>
									{beneficiary.gender}
								</article>
								<article className="font-Varela text-gray-800">
									<span className="font-Varela text-blue-500 font-bold">
										Observaciones:
									</span>
									<p className="font-Varela text-gray-800 mt-2">
										{beneficiary.observation}
									</p>
								</article>
							</section>
						</div>
					</div>
				))}
			{toggleDeleteView && (
				<ModalConfirmation
					title="¿Estás seguro?"
					message="Si aceptas borrarás permanentemente el usuario."
					handleCancel={deleteView}
					handleConfirm={deleteBeneficiary}
				/>
			)}
		</main>
	)
}
