'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '../../components/sidebar'
import { fetchDataBeneficiary } from './fetch'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ModalConfirmation from '../../components/modalConfirmation'
import BeneficiaryDetailsView from '../../components/beneficiaryDetailsView'
import BeneficiaryDetailsEdit from '../../components/beneficiaryDetailsEdit'
import { createAxiosInterceptors } from '../../axiosConfig'

export default function BeneficiaryDetails({ params }) {
	const [beneficiary, setBeneficiary] = useState(null)
	const [toggleEditView, setToggleEditView] = useState(false)
	const [toggleDeleteView, setToggleDeleteView] = useState(false)
	const [errors, setErrors] = useState(null)
	const router = useRouter()

	useEffect(() => {
		createAxiosInterceptors()
	}, [])

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
		let BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		if (BASEURL === undefined) {
			BASEURL = 'http://localhost:8080/api/v1'
		}
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
			console.log(formData.get('contact_phone'))
			valid = false
			newError.contact_phone = 'El teléfono no es válido'
		}

		// This is a XOR operation, if one of the three conditions is true, the result is true
		if (
			!dniRegExp.test(formData.get('nid')) ^
			!nieRegExp.test(formData.get('nid')) ^
			!passportRegExp.test(formData.get('nid'))
		) {
			valid = false
			newError.nid = 'El DNI/NIE/Pasaporte no coincide con el formato esperado'
		} else if (dniRegExp.test(formData.get('nid'))) {
			// Validate the letter of the DNI
			const dni = formData.get('nid')
			const letter = dni.charAt(dni.length - 1)
			const number = dni.slice(0, -1)
			const letters = 'TRWAGMYFPDXBNJZSQVHLCKE'
			const letterCorrect = letters.charAt(number % 23)
			if (letter !== letterCorrect) {
				valid = false
				newError.nid = 'La letra del DNI no es correcta'
			}
		}

		const birthDate = new Date(formData.get('birth_date'))
		const today = new Date()

		if (birthDate > today) {
			valid = false
			newError.birth_date = 'La fecha de nacimiento debe ser pasada'
		}

		setErrors(newError)
		return valid
	}

	function onSubmit(event) {
		let BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		if (BASEURL === undefined) {
			BASEURL = 'http://localhost:8080/api/v1'
		}
		event.preventDefault()

		const formData = new FormData(event.target)

		const valid = validateForm(formData)

		if (!valid) {
			return
		}
		console.log(formData.get('first_technician'))

		const jsonData = {
			name:
				formData.get('name').trim() === ''
					? beneficiary.name
					: formData.get('name'),
			alias:
				formData.get('alias').trim() === ''
					? beneficiary.alias
					: formData.get('alias'),
			contact_phone:
				formData.get('contact_phone') === ''
					? beneficiary.contact_phone
					: formData.get('contact_phone'),
			address:
				formData.get('address').trim() === ''
					? beneficiary.address
					: formData.get('address'),
			dossier_number:
				formData.get('dossier_number').trim() === ''
					? beneficiary.dossier_number
					: formData.get('dossier_number'),
			nid: formData.get('nid') === '' ? beneficiary.nid : formData.get('nid'),
			birth_date:
				formData.get('birth_date') === ''
					? beneficiary.birth_date
					: formData.get('birth_date'),
			first_technician:
				formData.get('first_technician').trim() === ''
					? beneficiary.first_technician
					: formData.get('first_technician'),
			gender:
				formData.get('gender') === ''
					? beneficiary.gender
					: formData.get('gender'),
			observation:
				formData.get('observation').trim() === ''
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
		<main className='flex w-full'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{beneficiary &&
				(toggleEditView ? (
					<BeneficiaryDetailsEdit
						beneficiary={beneficiary}
						onSubmit={onSubmit}
						deleteView={deleteView}
						handleToggle={handleToggle}
						setBeneficiary={setBeneficiary}
						errors={errors}
					/>
				) : (
					<BeneficiaryDetailsView
						beneficiary={beneficiary}
						editView={editView}
						deleteView={deleteView}
						handleToggle={handleToggle}
					/>
				))}
			{toggleDeleteView && (
				<ModalConfirmation
					title='¿Estás seguro?'
					message='Si aceptas borrarás permanentemente el usuario.'
					handleCancel={deleteView}
					handleConfirm={deleteBeneficiary}
				/>
			)}
		</main>
	)
}
