'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
import axios from 'axios'

export default function InterventionDetails({ intervention }) {
	const [toggleIntervention, setToggleIntervention] = useState(false)
	const [date, setDate] = useState('')

	function handleDateChange(newDate) {
		setDate(newDate)
		console.log(date)
	}

	function deleteIntervention() {
		const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
		try {
			axios.get(`${BASEURL}/acat/intervention/${intervention.id}`)
		} catch (error) {
			return null
		}
	}

	function editView() {
		setToggleIntervention(!toggleIntervention)
		setDate(intervention.date)
	}

	async function onSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.target)

		const jsonData = {
			username: formData.get('username').toString(),
			password: formData.get('password').toString(),
			email: formData.get('email').toString()
		}

		axios
			.post(
				process.env.NEXT_PUBLIC_BASE_URL + '/shared/user/',
				JSON.stringify(jsonData),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then(function (response) {
				alert(
					`El usuario ${response.data.username} con email ${response.data.email} ha sido creado correctamente`
				)
				editView()
			})
			.catch(function (error) {
				alert(
					`Ha habido un error al crear al nuevo usuario: ${error.response.data.detail}`
				)
			})
	}

	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300">
			<div className="flex gap-3 justify-end items-center w-full">
				<ButtonIcon
					iconpath="/edit.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-blue-500'}
					handleClick={editView}
				/>
				<ButtonIcon
					iconpath="/trash.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-red-500'}
					handleClick={deleteIntervention}
				/>
			</div>
			<div className="flex gap-2 items-center justify-center">
				<Image
					src="/calendar.svg"
					width={40}
					height={40}
					alt="Icono de calendario"
				/>
				<h1 className="text-center font-poppins text-2xl">
					{!toggleIntervention ? (
						<strong>Detalles de la intervención</strong>
					) : (
						<strong>Editar intervención</strong>
					)}
				</h1>
			</div>
			<hr></hr>
			{intervention && (
				<form onSubmit={onSubmit} className="flex flex-col gap-3">
					<article className="flex items-center w-full">
						<p className="font-Varela w-fit text-blue-500 font-bold mr-2">
							Paciente:
						</p>
						<div className={`flex items-center w-full border-gray-200`}>
							<p className="p-1 w-full rounded-xl bg-gray-50">
								{intervention.patient.alias}
							</p>
						</div>
					</article>
					<article className="flex items-center w-full">
						<label
							htmlFor="date"
							className="font-Varela w-fit text-blue-500 font-bold mr-2"
						>
							Fecha de atención:
						</label>
						<div
							className={`flex items-center w-fit ${toggleIntervention ? 'border-2 rounded-xl border-gray-200' : ''} bg-white`}
						>
							<input
								type={toggleIntervention ? 'date' : 'text'}
								id="date"
								name="date"
								placeholder={date === '' ? intervention.date : date}
								className={`p-1 w-full rounded-xl ${toggleIntervention ? 'bg-white' : 'bg-gray-50 placeholder-black'}`}
								disabled={!toggleIntervention}
								value={toggleIntervention ? date : ''}
								onChange={e => handleDateChange(e.target.value)}
							/>
						</div>
					</article>
					<article className="flex items-center w-full">
						<label
							htmlFor="typology"
							className="font-Varela w-fit text-blue-500 font-bold mr-2"
						>
							Tipología:
						</label>
						<div
							className={`flex items-center w-full ${toggleIntervention ? 'border-2 rounded-xl border-gray-200' : ''} bg-white`}
						>
							<select
								id="typology"
								name="typology"
								className={`p-1 w-full rounded-xl ${toggleIntervention ? 'bg-white' : 'bg-gray-50 placeholder-black'}`}
								disabled={!toggleIntervention}
								defaultValue="Prevencion"
							>
								<option value="Prevencion">Prevencion</option>
								<option value="Atencion">Atencion</option>
								<option value="Incorporacion sociolaborar">
									Incorporacion sociolaborar
								</option>
								<option value="otro">Otro</option>
							</select>
						</div>
					</article>
					<article className="flex items-center w-full">
						<label
							htmlFor="technician"
							className="font-Varela w-fit text-blue-500 font-bold mr-2"
						>
							Técnico:
						</label>
						<div
							className={`flex items-center w-full ${toggleIntervention ? 'border-2 rounded-xl border-gray-200' : ''} bg-white`}
						>
							<input
								type="text"
								id="technician"
								name="technician"
								placeholder={intervention.technician}
								className={`p-1 w-full rounded-xl ${toggleIntervention ? 'bg-white' : 'bg-gray-50 placeholder-black'}`}
								disabled={!toggleIntervention}
							/>
						</div>
					</article>
					<article className="flex items-center w-full">
						<label
							htmlFor="technician"
							className="font-Varela w-fit text-blue-500 font-bold mr-2"
						>
							Motivo:
						</label>
						<div
							className={`flex items-center w-full ${toggleIntervention ? 'border-2 rounded-xl border-gray-200' : ''} bg-white`}
						>
							<input
								type="text"
								id="technician"
								name="technician"
								placeholder={intervention.reason}
								className={`p-1 w-full rounded-xl ${toggleIntervention ? 'bg-white' : 'bg-gray-50 placeholder-black'}`}
								disabled={!toggleIntervention}
							/>
						</div>
					</article>
					<article className="flex flex-col">
						<label
							htmlFor="observations"
							className="font-Varela text-blue-500 font-bold mr-2"
						>
							Observaciones:
						</label>
						<div
							className={`flex items-center ${toggleIntervention ? 'border-2 rounded-xl border-gray-200' : ''} bg-white`}
						>
							<textarea
								className={`flex items-center rounded-xl p-1 w-full ${toggleIntervention ? 'bg-white' : 'bg-gray-50 placeholder-black'}`}
								type="text"
								placeholder={intervention.observations}
								id="observations"
								name="observations"
								disabled={!toggleIntervention}
							/>
						</div>
					</article>
				</form>
			)}
			{toggleIntervention && (
				<div className="flex items-center w-full justify-center gap-5 mt-5">
					<input
						type="submit"
						value="Confirmar cambios"
						className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
					/>
				</div>
			)}
		</div>
	)
}
