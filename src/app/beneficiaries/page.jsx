/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import Card from './card.jsx'
import { fetchDataBeneficiaries } from './fetch.js'

export default async function BeneficiariesList() {
	const data = await fetchDataBeneficiaries()
	return (
		<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
			{data.map(beneficiary => (
				<Link href={`/beneficiaries/${beneficiary.id}`} key={beneficiary.id}>
					<Card key={beneficiary.id} beneficiary={beneficiary} />
				</Link>
			))}
		</div>
	)
}
