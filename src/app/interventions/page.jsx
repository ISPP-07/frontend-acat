import Link from 'next/link'
import RegisterInterventionModal from './RegisterInterventionModal'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function AppointmentsPage({ searchParams }) {
	const show = searchParams?.show

	return (
		<>
			<Link href="/interventions/?show=true">SUMMON THE MODAL</Link>
			{show && <RegisterInterventionModal />}
		</>
	)
}
