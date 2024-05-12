/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'
import { Rehabilited } from '../../app/beneficiaries/rehabilited/fetch'
import axios from 'axios'

jest.mock('axios')

describe('fetchDataBeneficiariesRehabilited', () => {
	test('fetches successfully data from an API', async () => {
		const data = {
			elements: [{ id: 1, name: 'John Doe', is_rehabilitated: true }]
		}

		axios.get.mockResolvedValue({ data })

		const beneficiaries = await Rehabilited()

		expect(beneficiaries).toEqual(data.elements)
	})

	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(Rehabilited()).toBeNull
	})
})
