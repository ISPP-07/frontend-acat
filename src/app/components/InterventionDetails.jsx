'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import InterventionDetailsView from './InterventionDetailsView'
import InterventionDetailsUpdate from './InterventionDetailsUpdate'

export default function InterventionDetails({ intervention }) {
	const router = useRouter()
	const [toggleEditView, setToggleEditView] = useState(false)
	const [errors, setErrors] = useState({})
	const [confirmationModal, setConfirmationModal] = useState(false)

	function formattedDate(dateString) {
		const date = new Date(dateString)
		return date.toISOString()
	}

	function deleteIntervention() {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		try {
			axios.delete(`${BASEURL}/acat/intervention/${intervention.id}`)
			router.push('/interventions')
		} catch (error) {
			return null
		}
	}

	function editView() {
		setConfirmationModal(false)
		setToggleEditView(!toggleEditView)
	}

	function toggleConfirmationModal() {
		setConfirmationModal(!confirmationModal)
	}

	const validateForm = formData => {
		let valid = true
		const newError = {}

		if (formData.get('date').trim() === '') {
			valid = false
			newError.date = 'La fecha no puede estar vacía'
		}

		if (formData.get('typology').trim() === '') {
			valid = false
			newError.typology = 'La tipología no puede estar vacía'
		}

		if (formData.get('technician').trim() === '') {
			valid = false
			newError.technician = 'El técnico no puede estar vacío'
		}

		if (formData.get('reason').trim() === '') {
			valid = false
			newError.reason = 'El motivo no puede estar vacío'
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
			date:
				formData.get('date') === ''
					? intervention.date
					: formattedDate(formData.get('date')),
			typology:
				formData.get('typology') === ''
					? intervention.typology
					: formData.get('typology'),
			technician:
				formData.get('technician') === ''
					? intervention.technician
					: formData.get('technician'),
			reason:
				formData.get('reason') === ''
					? intervention.reason
					: formData.get('reason'),
			observations:
				formData.get('observations') === ''
					? intervention.observations
					: formData.get('observations')
		}

		axios
			.patch(BASEURL + '/acat/intervention/' + intervention.id, jsonData)
			.then(_ => {
				window.location.reload()
			})
			.catch(error => {
				console.error('Error al enviar los datos:', error)
				alert(
					'Se produjo un error al enviar los datos. Por favor, inténtalo de nuevo.'
				)
			})
	}

	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300 w-[45	0px]">
			<div className="flex gap-3 justify-end items-center w-full">
				<ButtonIcon
					iconpath="/edit.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-blue-500'}
					handleClick={editView}
					datatestid="editButton"
				/>
				<ButtonIcon
					iconpath="/trash.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-red-500'}
					handleClick={toggleConfirmationModal}
					datatestid="deleteButton"
				/>
			</div>
			<div className="flex gap-2 items-center justify-center w-full">
				<Image
					src="/calendar.svg"
					width={40}
					height={40}
					alt="Icono de calendario"
				/>
				<h1 className="text-center font-poppins text-2xl">
					{confirmationModal ? (
						<strong>Borrar Intervención</strong>
					) : !toggleEditView ? (
						<strong>Detalles de la intervención</strong>
					) : (
						<strong>Editar intervención</strong>
					)}
				</h1>
			</div>
			<hr></hr>
			{confirmationModal ? (
				<div data-testid="modalConfirmation">
					<h1 className="text-red-500 text-2xl text-center">¿Estas seguro?</h1>
					<div className="flex justify-between mt-4">
						<button
							data-testid="confirmButton"
							className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg mr-2"
							onClick={deleteIntervention}
						>
							Sí
						</button>
						<button
							className="border border-gray-300 text-black px-4 py-2 rounded-lg shadow-lg"
							onClick={toggleConfirmationModal}
						>
							No
						</button>
					</div>
				</div>
			) : intervention ? (
				toggleEditView ? (
					<InterventionDetailsUpdate
						intervention={intervention}
						errors={errors}
						onSubmit={onSubmit}
					/>
				) : (
					<InterventionDetailsView intervention={intervention} />
				)
			) : (
				<p>Cargando...</p>
			)}
		</div>
	)
}
