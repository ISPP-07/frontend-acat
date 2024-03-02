/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, waitFor, screen } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import InterventionList from '../../app/interventions/InterventionList.jsx'
import { fetchDataInterventions } from '../../app/interventions/fetch.jsx'

jest.mock('../../app/interventions/fetch.jsx')

describe('InterventionList', () => {
	test('Renderizar', async () => {
		const datos = [
			{
				id: 1,
				intervention_date: '2018-05-08T16:29:31.591Z',
				patient: 'John Doe'
			},
			{
				id: 2,
				intervention_date: '2018-05-08T16:29:31.591Z',
				patient: 'Jane Doe'
			}
		]

		fetchDataInterventions.mockResolvedValue(datos)

		const data = await fetchDataInterventions()

		expect(data).toEqual(datos)

		waitFor(() => {
			render(<InterventionList />)
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Jane Doe')).toBeInTheDocument()
		})
	})
})
