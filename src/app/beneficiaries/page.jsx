'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import { fetchDataBeneficiaries } from './fetch.js'
import CardBeneficiary from '../components/cardBeneficiary.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'

export default async function BeneficiariesList() {
	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => {
		setShowModal(!showModal)
	}
	const data = await fetchDataBeneficiaries()
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(beneficiary => (
						<Link
							href={`/beneficiaries/${beneficiary.id}`}
							key={beneficiary.id}
						>
							<CardBeneficiary key={beneficiary.id} beneficiary={beneficiary} />
						</Link>
					))}
				</div>
			</div>
			{/* {showModal ? <Modal closeModal={toggleModal} /> : null} */}
		</main>
	)
}
