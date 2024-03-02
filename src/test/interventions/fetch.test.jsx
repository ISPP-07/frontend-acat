/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDataInterventions } from '../../app/interventions/fetch.jsx'
import axios from 'axios'

jest.mock('axios')

describe('fetchDataInterventions', () => {
	test('fetches successfully data from an API', async () => {
		const data = [
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

		axios.get.mockResolvedValue({ data })

		const interventions = await fetchDataInterventions()

		expect(interventions).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDataInterventions()).rejects.toThrow(errorMessage)
	})
})
