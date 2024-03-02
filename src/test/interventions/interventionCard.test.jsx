/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import InterventionCard from '../../app/interventions/InterventionCard'

describe('Card', () => {
	test('renders Card component without crashing', () => {
		render(
			<InterventionCard
				intervention={{
					patient: 'John Doe',
					intervention_date: '2018-05-08T16:29:31.591Z'
				}}
			/>
		)
	})

	test('renders Card component with beneficiary data', () => {
		const interventionData = {
			patient: 'John Doe',
			intervention_date: '2018-05-08T16:29:31.591Z'
		}
		render(<InterventionCard intervention={interventionData} />)
	})

	test('test 2', () => {
		const interventionsData = [
			{
				id: 1,
				patient: 'John Doe',
				intervention_date: '2018-05-08T16:29:31.591Z'
			},
			{
				id: 2,
				patient: 'Jane Doe',
				intervention_date: '2019-05-08T16:29:31.591Z'
			}
		]

		const { getByText } = render(
			<div>
				{interventionsData.map(intervention => (
					<InterventionCard key={intervention.id} intervention={intervention} />
				))}
			</div>
		)
		interventionsData.forEach(intervention => {
			expect(getByText(intervention.patient)).toBeDefined()
			expect(getByText(intervention.intervention_date)).toBeDefined()
		})
	})

	test('on click', () => {
		const { getByTestId } = render(
			<InterventionCard
				intervention={{
					patient: 'John Doe',
					intervention_date: '2018-05-08T16:29:31.591Z'
				}}
			/>
		)

		// Find the component by its data-testid
		const clickable = getByTestId('intervention-card')

		// Simulate a click on the component
		fireEvent.click(clickable)

		const modal = getByTestId('close')

		// Check if the click handler function was called

		expect(modal).not.toBeNull()
	})
})
