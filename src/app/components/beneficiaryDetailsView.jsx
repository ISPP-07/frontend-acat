'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
import ButtonText from './buttonText'
import RegisterInterventionModal from './RegisterInterventionModal'

export default function BeneficiaryDetailsView({
	beneficiary,
	editView,
	deleteView,
	handleToggle
}) {
	const [showModal, setShowModal] = useState(false)

	const birthDate = new Date(beneficiary.birth_date).toLocaleDateString(
		'es-ES',
		{
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}
	)
	return (
		<div className='w-full h-full flex'>
			<div className='flex flex-col gap-4 h-screen w-[500px] bg-white border border-solid shadow-xl p-5 px-8'>
				<div className='flex items-center gap-4'>
					<Image alt='imagen-familia' src='/face.svg' width={50} height={50} />
					<div className='flex items-center justify-between w-full'>
						<span className='font-Varela text-black text-2xl font-bold'>
							{beneficiary.name}
						</span>
						<div className='flex items-center gap-2'>
							<ButtonIcon
								datatestid='editButton'
								iconpath='/edit.svg'
								iconHeight={18}
								iconWidth={18}
								border={'bg-blue-500'}
								handleClick={editView}
							/>
							<ButtonIcon
								datatestid='deleteButton'
								iconpath='/trash.svg'
								iconHeight={18}
								iconWidth={18}
								color={'bg-red-500'}
								handleClick={deleteView}
							/>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-between gap-3'>
					<ButtonText
						text='+ Nueva Intervención'
						color='bg-green-700'
						isRounded='true'
						px='3'
						className='shadow-2xl font-Varela text-sm text-white'
						handleClick={() => setShowModal(!showModal)}
					/>
					<div className='flex justfiy-center items-center gap-2'>
						<span>FINALIZADO</span>
						<div
							id='toggle'
							className={`border-2 rounded-full w-[50px] ${beneficiary.is_rehabilitated ? 'bg-blue-600' : 'bg-gray-300'} flex items-center`}
						>
							<input
								type='checkbox'
								name='is_rehabilitated'
								id='is_rehabilitated'
								defaultChecked={beneficiary.is_rehabilitated}
								className='relative translate-x-0 ease-in duration-150 checked:translate-x-full block w-6 h-6 rounded-full appearance-none bg-white border-4 cursor-pointer'
								onChange={handleToggle}
								data-testid='is_rehabilitated'
							/>
						</div>
					</div>
				</div>
				<hr />
				<div className='flex items-center gap-3'>
					<Image alt='imagen-alias' src='/user.svg' width={20} height={20} />
					<span className='font-Varela text-gray-800 text-base'>
						{beneficiary.alias}
					</span>
				</div>
				<div className='flex items-center gap-3'>
					<Image
						alt='imagen-telefono'
						src='/phone.svg'
						width={20}
						height={20}
					/>
					<span className='font-Varela text-gray-800 text-base'>
						{beneficiary.contact_phone || 'Sin teléfono'}
					</span>
				</div>
				<div className='flex items-center gap-3'>
					<Image
						alt='imagen-dirección'
						src='/address.svg'
						width={20}
						height={20}
					/>
					<span className='font-Varela text-gray-800 text-base'>
						{beneficiary.address || 'Sin dirección'}
					</span>
				</div>
				<hr />
				<section className='flex flex-col gap-3'>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold mr-2'>
							Nº de expediente:
						</span>
						{beneficiary.dossier_number}
					</article>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold mr-2'>
							DNI:
						</span>
						{beneficiary.nid}
					</article>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold mr-2'>
							Fecha de nacimiento:
						</span>
						{birthDate} ({beneficiary.age} años)
					</article>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold mr-2'>
							Técnico:
						</span>
						{beneficiary.first_technician || '--'}
					</article>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold mr-2'>
							Sexo:
						</span>
						{/* Hombre if Man, else Woman */}
						{beneficiary.gender === 'Man' ? 'Hombre' : 'Mujer'}
					</article>
					<article className='font-Varela text-gray-800'>
						<span className='font-Varela text-blue-500 font-bold'>
							Observaciones:
						</span>
						<p className='font-Varela text-gray-800 mt-2'>
							{beneficiary.observation || '--'}
						</p>
					</article>
				</section>
			</div>
			{showModal ? (
				<RegisterInterventionModal
					onClickFunction={() => setShowModal(!showModal)}
					beneficiaryId={beneficiary.id}
				/>
			) : null}
		</div>
	)
}
