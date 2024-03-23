/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import CardIntervention from '../../app/components/cardIntervention.jsx'

describe('Card', () => {
	test('renders Card component without crashing', () => {
		render(
			<CardIntervention
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
		render(<CardIntervention intervention={interventionData} />)
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
					<CardIntervention key={intervention.id} intervention={intervention} />
				))}
			</div>
		)
		interventionsData.forEach(intervention => {
			expect(getByText(intervention.patient)).toBeDefined()
		})
	})

	test('on click', () => {
		const { getByTestId } = render(
			<CardIntervention
				intervention={{
					patient: 'John Doe',
					intervention_date: '2018-05-08T16:29:31.591Z'
				}}
			/>
		)

		const modal = getByTestId('close')

		expect(modal).not.toBeNull()
	})
})
