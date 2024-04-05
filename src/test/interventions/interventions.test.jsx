/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, waitFor, screen } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import InterventionPage from '../../app/interventions/page'
import { fetchDataInterventions } from '../../app/interventions/fetchIntervention.js'

jest.mock('../../app/interventions/fetchIntervention.js')
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	}),
	useSearchParams: () => ({
		get: jest.fn()
	}),
	usePathname: () => ({
		get: jest.fn()
	})
}))

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

		waitFor(async () => {
			render(<InterventionPage />)
			expect(screen.getByText('John Doe')).toBeInTheDocument()
			expect(screen.getByText('Jane Doe')).toBeInTheDocument()
		})
	})
})
