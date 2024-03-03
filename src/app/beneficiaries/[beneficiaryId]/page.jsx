/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { fetchDataBeneficiary } from './fetch'
import User from '../../components/icons/user'
import Phone from '../../components/icons/phone'
import Location2 from '../../components/icons/location-2'
import IconButton from './iconButton'
import InboxArrowDown from '../../components/icons/inbox-arrow-down'
import Pen3 from '../../components/icons/pen-3'
import MockSwitch from './mockSwitch'

export default async function BeneficiaryDetails({ params }) {
	const beneficiary = await fetchDataBeneficiary(params.beneficiaryId)

	return (
		<div className="font-Varela text-black relative top-12 text-lg">
			<div className="text-2xl flex items-center justify-between">
				<div className="flex justify-self-start">
					<User height="34" width="34" />
					<strong>{beneficiary.name}</strong>
				</div>
				<div className="flex justify-end  gap-2 mr-80">
					<IconButton
						icon={InboxArrowDown}
						disabled={true}
						color="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500"
					/>
					<IconButton
						icon={Pen3}
						disabled={true}
						color=" bg-blue-300 hover:bg-blue-400 active:bg-blue-500"
					/>
				</div>
			</div>
			<div className="flex justify-between mt-4">
				<div>
					<button className="bg-green-700  p-2 h-10 text-white relative rounded-full font-Varela text-sm right">
						+ Nueva intervención
					</button>
				</div>
				<div className="mr-80 flex">
					<div className="left mr-4">FINALIZADO</div>
					<MockSwitch />
				</div>
			</div>
			<hr className="border-t border-dotted my-8" />
			<div className="flex mr">
				<div className="mr-2">
					<Phone />
				</div>
				<strong>{beneficiary.contact_phone}</strong>
			</div>
			<div className="flex">
				<div className="mr-2">
					<Location2 />
				</div>
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
				<div className="mt-6 w-96">
					<p>
						<strong style={{ color: '#4B7BECFF' }}>Observaciones:</strong>
					</p>
					<p>{beneficiary.observation_text}</p>
				</div>
			</div>
		</div>
	)
}
