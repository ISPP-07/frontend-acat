'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import CardIntervention from '../components/cardIntervention'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import Link from 'next/link'
import { fetchDataInterventions } from './fetchIntervention'

export default async function InterventionPage() {
	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => {
		setShowModal(!showModal)
	}
	const data = await fetchDataInterventions()
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(intervention => (
						<Link
							href={`/beneficiaries/${intervention.id}`}
							key={intervention.id}
						>
							<CardIntervention
								key={intervention.id}
								intervention={intervention}
							/>
						</Link>
					))}
				</div>
			</div>
			{/* {showModal ? <Modal closeModal={toggleModal} /> : null} */}
		</main>
	)
}
