'use client'
import RegisterInterventionModal from './RegisterInterventionModal'
import InterventionList from './InterventionList'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function AppointmentsPage({ searchParams }) {
	const show = searchParams?.show === 'true'

	if (show) {
		return (
			<>
				<RegisterInterventionModal isVisible={show} />
				<InterventionList className="z-10" />
			</>
		)
	}
	return <InterventionList />
}
