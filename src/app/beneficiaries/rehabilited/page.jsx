'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import CardBeneficiary from '../../components/cardBeneficiary.jsx'
import Sidebar from '../../components/sidebar.jsx'
import Searchbar from '../../components/searchbar.jsx'
import { Rehabilited } from './fetch.js'
import Image from 'next/image'
import { exportData } from '../../exportData.js'
import CreateModal from '../create.jsx'
import { createAxiosInterceptors } from '../../axiosConfig'

export default function BeneficiariesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	useEffect(() => {
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const data = await Rehabilited()
				setData(data)
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
		<main className='flex w-full'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex flex-col items-center'>
				<Searchbar handleClick={toggleModal} stext='Dar de alta' />
				<div className='flex flex-row'>
					<button
						className=' bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2'
						onClick={async () => {
							const data = (await Rehabilited()).elements
							// Change 'Man' to 'Hombre' and 'Woman' to 'Mujer'
							data.forEach(beneficiary => {
								if (beneficiary.gender === 'Man') beneficiary.gender = 'Hombre'
								else beneficiary.gender = 'Mujer'
							})
							// Export all but the id
							exportData(data, 'Beneficiarios', {
								name: 'nombre',
								first_surname: 'primer apellido',
								second_surname: 'segundo apellido',
								// alias: 'alias',
								nid: 'dni',
								birth_date: 'fecha nacimiento',
								gender: 'genero',
								address: 'direccion',
								contact_phone: 'telefono',
								dossier_number: 'numero expediente',
								// is_rehabilitated: 'rehabilitado',
								first_technician: 'tecnico',
								// registration_date: 'fecha de alta',
								observation: 'observacion'
							})
						}}
						data-testid='export-button'
					>
						<Image
							alt='Exportar a excel'
							src='/excel.svg'
							className='ml-2'
							width={15}
							height={15}
						/>
					</button>
				</div>
				<div className='container p-10 flex flex-wrap gap-5 justify-center items-center'>
					<Suspense fallback={<div>Cargando...</div>}>
						{data &&
							data.map(beneficiary => (
								<Link
									href={`/beneficiaries/${beneficiary.id}`}
									key={beneficiary.id}
								>
									<CardBeneficiary
										key={beneficiary.id}
										beneficiary={beneficiary}
									/>
								</Link>
							))}
					</Suspense>
				</div>
			</div>
			{showModal ? <CreateModal closeModal={toggleModal} /> : null}
		</main>
	)
}
