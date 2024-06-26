/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDataBeneficiaries } from '../../app/beneficiaries/fetch.js'
import axios from 'axios'

jest.mock('axios')

describe('fetchDataBeneficiaries', () => {
	test('fetches successfully data from an API', async () => {
		const data = [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]

		axios.get.mockResolvedValue({ data })

		const beneficiaries = await fetchDataBeneficiaries()

		expect(beneficiaries).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDataBeneficiaries()).toBeNull
	})
})
