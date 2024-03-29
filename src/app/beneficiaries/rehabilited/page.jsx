'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import CardBeneficiary from '../../components/cardBeneficiary.jsx'
import Sidebar from '../../components/sidebar.jsx'
import Searchbar from '../../components/searchbar.jsx'
import { Rehabilited } from './fetch.js'
import CreateModal from '../create.jsx'

export default function BeneficiariesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	useEffect(() => {
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
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />

				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
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
