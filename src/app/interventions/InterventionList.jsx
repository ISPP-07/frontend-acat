/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import InterventionCard from './InterventionCard'
import Link from 'next/link.js'
import { fetchDataInterventions } from './fetch.jsx'

export default async function InterventionList() {
	const data = await fetchDataInterventions()
	return (
		<div className="max-w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28 z-10">
			{data.map(intervention => (
				<Link href={'interventions'} key={intervention.id}>
					<InterventionCard key={intervention.id} intervention={intervention} />
				</Link>
			))}
		</div>
	)
}
