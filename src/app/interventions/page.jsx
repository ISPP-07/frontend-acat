import Link from 'next/link'
import RegisterInterventionModal from './RegisterInterventionModal'
import InterventionList from './InterventionList'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function AppointmentsPage({ searchParams }) {
	const show = searchParams?.show === 'true'

	return (
		<>
			<Link href="/interventions/?show=true"></Link>
			{show && <RegisterInterventionModal className="z-50 absolute" />}
			<InterventionList />
		</>
	)
}
