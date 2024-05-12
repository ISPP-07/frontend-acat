/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import axios from 'axios'
import BeneficiaryDetails from '../../app/beneficiaries/[beneficiaryId]/page.jsx'

function getCurrentDate() {
	const date = new Date()
	const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
	return formattedDate
}

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
describe('BeneficiaryDetails', () => {
	const mockBeneficiary = {
		name: 'A',
		first_surname: 'B',
		second_surname: 'C',
		alias: 'D',
		nid: 'E',
		birth_date: '2023-03-28',
		gender: 'Man',
		address: 'F',
		age: 1,
		contact_phone: 'G',
		dossier_number: 'H',
		is_rehabilitated: false,
		first_technician: 'I',
		registration_date: getCurrentDate(),
		observation: 'J'
	}
	jest.mock('axios')
	test('renders detail page', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: mockBeneficiary })

		const add = some => true
		loaderSpy.mockReturnValue({ classList: { add } })

		render(<BeneficiaryDetails params={1} />)
	})
	test('error when rendering', async () => {
		const errorMessage = 'Network Error'

		const axiosSpy = jest.spyOn(axios, 'get')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockRejectedValue(new Error(errorMessage))

		const add = some => true
		loaderSpy.mockReturnValue({ classList: { add } })

		render(<BeneficiaryDetails params={1} />)
	})

	test('edit beneficiary wrong nid', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: mockBeneficiary })

		const add = some => true
		loaderSpy.mockReturnValue({ classList: { add } })

		render(<BeneficiaryDetails params={10} />)

		const editButton = await screen.findByTestId('editButton')
		editButton.click()

		const saveButton = await screen.findByTestId('saveButton')

		saveButton.click()
	})
	test('edit beneficiary correct nid', async () => {
		const mockBeneficiaryCorrect = {
			name: 'A',
			first_surname: 'B',
			second_surname: 'C',
			alias: 'D',
			nid: '79466642D',
			birth_date: '2023-03-28',
			gender: 'Man',
			address: 'F',
			age: 1,
			contact_phone: '454454454',
			dossier_number: 'H',
			is_rehabilitated: false,
			first_technician: 'I',
			registration_date: getCurrentDate(),
			observation: 'J'
		}
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPatchSpy = jest.spyOn(axios, 'patch')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: mockBeneficiaryCorrect })
		axiosPatchSpy.mockResolvedValue({ data: mockBeneficiaryCorrect })

		const add = some => true
		const remove = some => true

		loaderSpy.mockReturnValue({ classList: { add, remove } })

		render(<BeneficiaryDetails params={10} />)

		const editButton = await screen.findByTestId('editButton')
		editButton.click()

		const saveButton = await screen.findByTestId('saveButton')

		saveButton.click()
		expect(axiosPatchSpy).toHaveBeenCalled()
	})
	test('rehabilitate beneficiary', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosPatchSpy = jest.spyOn(axios, 'patch')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: mockBeneficiary })
		axiosPatchSpy.mockResolvedValue({ data: mockBeneficiary })

		const add = some => true
		const remove = some => true
		loaderSpy.mockReturnValue({ classList: { add, remove } })

		render(<BeneficiaryDetails params={10} />)

		const toggleRehab = await screen.findByTestId('is_rehabilitated')
		fireEvent.click(toggleRehab)

		expect(axiosPatchSpy).toHaveBeenCalled()
	})

	test('delete beneficiary', async () => {
		const axiosSpy = jest.spyOn(axios, 'get')
		const axiosDeleteSpy = jest.spyOn(axios, 'delete')

		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: mockBeneficiary })
		axiosDeleteSpy.mockResolvedValue({ data: mockBeneficiary })
		const confirmSpy = jest.spyOn(window, 'confirm')
		confirmSpy.mockImplementation(jest.fn(() => true))

		const add = some => true
		const remove = some => true
		loaderSpy.mockReturnValue({ classList: { add, remove } })

		render(<BeneficiaryDetails params={10} />)

		const deleteButton = await screen.findByTestId('deleteButton')
		fireEvent.click(deleteButton)

		const confirmDeleteButton = await screen.findByTestId('confirmButton')
		fireEvent.click(confirmDeleteButton)

		expect(axiosDeleteSpy).toHaveBeenCalled()
	})
})
