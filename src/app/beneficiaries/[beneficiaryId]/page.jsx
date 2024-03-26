'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Sidebar from '@/app/components/sidebar'
import Image from 'next/image'
import ButtonIcon from '../../components/buttonIcon'
import ButtonText from '../../components/buttonText'
import { fetchDataBeneficiary } from './fetch'

export default function BeneficiaryDetails({ params }) {
	const [beneficiary, setBeneficiary] = useState(null)
	const [toggleEditView, setToggleEditView] = useState(false)
	const birthDate = new Date(beneficiary?.birth_date).toLocaleDateString()

	function editView() {
		setToggleEditView(!toggleEditView)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const beneficiary = await fetchDataBeneficiary(params.beneficiaryId)
				setBeneficiary(beneficiary)
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
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			{beneficiary &&
				(toggleEditView ? (
					<form className="w-full h-full flex">
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
										<input
											type="text"
											id="name"
											name="name"
											placeholder={beneficiary.name ?? 'Nombre:'}
											className="p-1 border-2 rounded-xl placeholder-black"
										/>
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
									<div className="border-2 rounded-full w-[50px] bg-blue-500 flex items-center justify-end">
										<div className="rounded-full h-6 w-6 bg-white"></div>
									</div>
								</div>
							</div>
							<hr />
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
									<span className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap">
										Fecha de nacimiento:
									</span>
									{birthDate} ({beneficiary.age} años)
								</fieldset>
								<fieldset className="font-Varela text-gray-800 flex items-center">
									<span className="font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap">
										Técnico:
									</span>
									{beneficiary.first_technician}
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
									<label className="font-Varela text-blue-500 font-bold flex">
										Observaciones:
									</label>
									<textarea className="font-Varela text-gray-800 mt-2 w-full border-2 rounded-xl p-1">
										{beneficiary.observation}
									</textarea>
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
									<div className="border-2 rounded-full w-[50px] bg-blue-500 flex items-center justify-end">
										<div className="rounded-full h-6 w-6 bg-white"></div>
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
									{beneficiary.address}
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
									{beneficiary.contact_phone}
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
		</main>
	)
}
