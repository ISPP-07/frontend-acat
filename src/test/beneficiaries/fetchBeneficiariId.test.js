/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDataBeneficiary } from '../../app/beneficiaries/[beneficiaryId]/fetch.js'
import axios from 'axios'

jest.mock('axios')

describe('fetchDataBeneficiaries', () => {
	test('fetches successfully data from an API', async () => {
		const data = [{ id: 1, name: 'John Doe' }]

		axios.get.mockResolvedValue({ data })

		const beneficiaries = await fetchDataBeneficiary()

		expect(beneficiaries).toEqual(data)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDataBeneficiary()).toBeNull
	})
})
