/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react'
import Sidebar from '@/app/components/sidebar'
import Image from 'next/image'
import ButtonIcon from '../../components/buttonIcon'
import ButtonText from '../../components/buttonText'
/* eslint-enable no-unused-vars */
import { fetchDataBeneficiary } from './fetch'

export default async function BeneficiaryDetails({ params }) {
	const beneficiary = await fetchDataBeneficiary(params.beneficiaryId)
	const birthDate = new Date(beneficiary.birth_date)
		.toLocaleString()
		.split(',')[0]
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
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
									iconpath="/trash.svg"
									iconHeight={18}
									iconWidth={18}
									color={'bg-red-500'}
								/>
								<ButtonIcon
									iconpath="/edit.svg"
									iconHeight={18}
									iconWidth={18}
									border={'bg-blue-500'}
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
					<hr></hr>
					<div className="flex items-center gap-3">
						<Image
							alt="imagen-telefono"
							src="/phone.svg"
							width={20}
							height={20}
						></Image>
						<p className="font-Varela text-gray-800 text-base">
							{beneficiary.address}
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Image
							alt="imagen-dirección"
							src="/address.svg"
							width={20}
							height={20}
						></Image>
						<p className="font-Varela text-gray-800 text-base">
							{beneficiary.contact_phone}
						</p>
					</div>
					<hr></hr>
					<div className="flex flex-col gap-3">
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Edad:
							</span>
							{beneficiary.age}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Nº de expediente:
							</span>
							{beneficiary.dossier_number}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								DNI:
							</span>
							{beneficiary.dni}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Fecha de nacimiento:
							</span>
							{birthDate}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Técnico:
							</span>
							{beneficiary.first_technician_name}
						</p>
						<p className="font-Varela text-gray-800">
							<span className="font-Varela text-blue-500 font-bold mr-2">
								Sexo:
							</span>
							{beneficiary.sex}
						</p>
						<p className="font-Varela text-gray-800">
							<p className="font-Varela text-blue-500 font-bold">
								Observaciones:
							</p>
							<p className="font-Varela text-gray-800 mt-2">
								{beneficiary.observation_text}
							</p>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}