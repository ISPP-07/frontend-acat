/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import Card from './card.jsx'
import { fetchDataBeneficiaries } from './fetch.js'

export default async function BeneficiariesList() {
	const data = await fetchDataBeneficiaries()
	return (
		<div className="max-w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data?.map(beneficiary => (
				<Link href={`/beneficiaries/${beneficiary.id}`} key={beneficiary.id}>
					<Card key={beneficiary.id} beneficiary={beneficiary} />
				</Link>
			))}
		</div>
	)
}
