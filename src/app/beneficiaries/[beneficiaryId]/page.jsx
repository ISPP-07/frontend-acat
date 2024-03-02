/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { fetchDataBeneficiary } from './fetch'
import User from '@/app/components/icons/user'
import Phone from '@/app/components/icons/phone'
import Location2 from '@/app/components/icons/location-2'

export default async function BeneficiaryDetails({ params }) {
	const beneficiary = await fetchDataBeneficiary(params.beneficiaryId)

	return (
		<div className="font-Varela text-black relative top-12 text-lg">
			<div className="text-2xl flex">
				<User height="34" width="34" />
				<strong>{beneficiary.name}</strong>
			</div>
			<div className="flex">
				<div>
					<button className="bg-green-700  w-5/6 h-10 text-white relative rounded-full font-Varela text-sm right">
						+ Nueva intervención
					</button>
				</div>
				<div className="left">FINALIZADO</div>
			</div>
			<hr className="border-t border-dotted my-8" />
			<div className="flex">
				<Phone />
				<strong>{beneficiary.contact_phone}</strong>
			</div>
			<div className="flex">
				<Location2 />
				<strong>{beneficiary.address}</strong>
			</div>
			<hr className="border-t border-dotted my-8" />
			<div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Edad: </strong>{' '}
						{beneficiary.age}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>DNI: </strong>{' '}
						{beneficiary.dni}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>
							Fecha de nacimiento:{' '}
						</strong>{' '}
						{beneficiary.birth_date}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Técnico: </strong>{' '}
						{beneficiary.first_technician_name}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Sexo: </strong>{' '}
						{beneficiary.sex}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Nº de expediente: </strong>{' '}
						{beneficiary.dossier_number}
					</p>
				</div>
				<div className="mt-6">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Observaciones:</strong>
					</p>
					<p>{beneficiary.observation_text}</p>
				</div>
			</div>
		</div>
	)
}
