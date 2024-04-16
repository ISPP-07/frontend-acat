'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
import ButtonText from './buttonText'

export default function BeneficiaryDetailsEdit({
	beneficiary,
	onSubmit,
	deleteView,
	handleToggle,
	setBeneficiary,
	errors = {}
}) {
	return (
		<form onSubmit={onSubmit} className='w-full h-full flex'>
			<div className='flex flex-col gap-4 h-screen w-[500px] bg-white border border-solid shadow-xl p-5 px-8'>
				<div className='flex items-center gap-4'>
					<Image alt='imagen-familia' src='/face.svg' width={50} height={50} />
					<div className='flex items-center justify-between w-full gap-1'>
						<span className='font-Varela text-black text-sm md:text-lg font-bold'>
							<input
								type='text'
								id='name'
								name='name'
								defaultValue={beneficiary.name ?? ''}
								placeholder={'Nombre:'}
								className='p-1 border-2 rounded-xl placeholder-black'
								data-testid='name'
							/>
						</span>
						<div className='flex items-center gap-2'>
							<ButtonIcon
								datatestid='saveButton'
								iconpath='/check.svg'
								iconHeight={18}
								iconWidth={18}
								color={'bg-green-500'}
								isSubmit
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
					/>
					<div className='flex justfiy-center items-center gap-2'>
						<label htmlFor='is_rehabilitated' className='hover:cursor-pointer'>
							FINALIZADO
						</label>
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
							/>
						</div>
					</div>
				</div>
				<hr />
				<fieldset className='flex items-center gap-3'>
					<label htmlFor='contact_phone'>
						<Image
							alt='imagen-telefono'
							src='/phone.svg'
							width={20}
							height={20}
						/>
					</label>
					<input
						type='text'
						id='contact_phone'
						name='contact_phone'
						defaultValue={beneficiary.contact_phone ?? ''}
						placeholder={'Teléfono:'}
						className='p-1 border-2 rounded-xl placeholder-black'
						data-testid='contact_phone'
					/>
				</fieldset>
				{errors?.contact_phone && (
					<span className='text-red-500'>{errors.contact_phone}</span>
				)}
				<fieldset className='flex items-center gap-3'>
					<label htmlFor='address'>
						<Image
							alt='imagen-dirección'
							src='/address.svg'
							width={20}
							height={20}
						/>
					</label>
					<input
						type='text'
						id='address'
						name='address'
						defaultValue={beneficiary.address ?? ''}
						placeholder={'Dirección:'}
						className='p-1 border-2 rounded-xl placeholder-black'
						data-testid='address'
					/>
				</fieldset>
				<hr />
				<section className='flex flex-col gap-3'>
					<fieldset className='font-Varela text-gray-800 flex items-center w-full'>
						<label
							htmlFor='dossier_number'
							className='font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap'
						>
							Nº de expediente:
						</label>
						<input
							type='text'
							id='dossier_number'
							name='dossier_number'
							defaultValue={beneficiary.dossier_number ?? ''}
							placeholder={'Nº de expediente:'}
							className='p-1 border-2 rounded-xl placeholder-black w-full'
							data-testid='dossier_number'
						/>
					</fieldset>
					<fieldset className='font-Varela text-gray-800 flex items-center'>
						<label
							htmlFor='nid'
							className='font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap'
						>
							DNI:
						</label>
						<input
							type='text'
							id='nid'
							name='nid'
							defaultValue={beneficiary.nid ?? ''}
							placeholder={'DNI:'}
							className='p-1 border-2 rounded-xl placeholder-black w-full'
							data-testid='nid'
						/>
					</fieldset>
					{errors?.nid && <span className='text-red-500'>{errors.nid}</span>}
					<fieldset className='font-Varela text-gray-800 flex items-center'>
						<label
							htmlFor='birth_date'
							className='font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap'
						>
							Fecha de nacimiento:
						</label>
						<input
							type='date'
							id='birth_date'
							name='birth_date'
							defaultValue={beneficiary.birth_date}
							placeholder={'Fecha de nacimiento:'}
							value={beneficiary.birth_date}
							onChange={e =>
								setBeneficiary({
									...beneficiary,
									birth_date: e.target.value
								})
							}
							className='p-1 border-2 rounded-xl placeholder-black w-full'
							data-testid='birth_date'
						/>
					</fieldset>
					{errors?.birth_date && (
						<span className='text-red-500'>{errors.birth_date}</span>
					)}
					<fieldset className='font-Varela text-gray-800 flex items-center'>
						<label
							htmlFor='first_technician'
							className='font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap'
						>
							Técnico:
						</label>
						<input
							type='text'
							id='first_technician'
							name='first_technician'
							defaultValue={beneficiary.first_technician ?? ''}
							placeholder={'Técnico:'}
							className='p-1 border-2 rounded-xl placeholder-black w-full'
							data-testid='first_technician'
						/>
					</fieldset>
					<fieldset className='font-Varela text-gray-800 flex items-center'>
						<label
							htmlFor='gender'
							className='font-Varela text-blue-500 font-bold mr-2 w-fit text-nowrap'
						>
							Sexo:
						</label>
						<select
							name='gender'
							id='gender'
							defaultValue={beneficiary.gender}
							className='p-1 border-2 rounded-xl w-full bg-white'
							data-testid='gender'
						>
							<option value='Man'>Hombre</option>
							<option value='Woman'>Mujer</option>
						</select>
					</fieldset>
					<fieldset className='font-Varela text-gray-800'>
						<label
							htmlFor='observation'
							className='font-Varela text-blue-500 font-bold flex'
						>
							Observaciones:
						</label>
						<textarea
							className='font-Varela text-gray-800 mt-2 w-full border-2 rounded-xl p-1'
							id='observation'
							name='observation'
							defaultValue={beneficiary.observation}
							placeholder={'Observaciones:'}
							data-testid='observation'
						></textarea>
					</fieldset>
				</section>
			</div>
		</form>
	)
}
