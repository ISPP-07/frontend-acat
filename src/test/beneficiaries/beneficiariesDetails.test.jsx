/* eslint-disable no-unused-vars */
import React from 'react'
import { render, waitFor, fireEvent, userEvent } from '@testing-library/react'
import { test, expect, describe, jest, screen } from '@jest/globals'
import BeneficiariesList from '../../app/beneficiaries/page.jsx'
import CreateModal from '../../app/beneficiaries/create.jsx'
import MockSwitch from '../../app/beneficiaries/[beneficiaryId]/mockSwitch.jsx'
import IconButton from '../../app/beneficiaries/[beneficiaryId]/iconButton.jsx'
import axios from 'axios'
import BeneficiaryDetails from '../../app/beneficiaries/[beneficiaryId]/page.jsx'

/* eslint-enable no-unused-vars */
import { fetchDataBeneficiary } from '../../app/beneficiaries/[beneficiaryId]/fetch.js'
jest.mock('axios')

describe('MockSwitch', () => {
	test('renders the switch component', () => {
		const switchElement = render(<MockSwitch />)

		const switchElement2 = switchElement.getByRole('button')
		expect(switchElement2).toBeDefined()
	})
})

describe('IconButton', () => {
	test('renders the button with the provided icon', () => {
		const icon = render(<IconButton icon={() => <svg data-testid="icon" />} />)
		const icon2 = icon.getByTestId('icon')
		expect(icon2).toBeDefined()
	})
})

describe('fetchDataBeneficiary', () => {
	test('fetches data successfully from an API', async () => {
		const data = { id: 0, name: 'John Doe' }

		// Mock axios.get to return the desired data
		axios.get.mockResolvedValue({ data })

		// Call the function and await its response
		const beneficiary = await fetchDataBeneficiary(0)

		// Check if the returned data matches the expected data
		expect(beneficiary).toEqual(data)
	})
	test('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error'

		axios.get.mockRejectedValue(new Error(errorMessage))

		await expect(fetchDataBeneficiary()).rejects.toThrow(errorMessage)
	})
})
