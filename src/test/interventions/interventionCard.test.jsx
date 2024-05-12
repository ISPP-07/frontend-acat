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
