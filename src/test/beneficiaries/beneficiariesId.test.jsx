/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import axios from 'axios'
import BeneficiaryDetails from '../../app/beneficiaries/[beneficiaryId]/page.jsx'
import { fetchDataBeneficiary } from '../../app/beneficiaries/[beneficiaryId]/fetch.js'

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
		registration_date: '2024-03-28',
		observation: 'J'
	}

	let createdBeneficiary = 'iniziado'
	let axiosPostSpy

	// eslint-disable-next-line
	beforeEach(() => {
		const createBeneficiary = async beneficiary => {
			try {
				const response = await axios.post(
					'http://localhost:8080/api/v1/acat/patient',
					beneficiary,
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				return response.data
			} catch (error) {
				console.error(error)
				return null
			}
		}

		return createBeneficiary(mockBeneficiary)
			.then(data => {
				createdBeneficiary = data
			})
			.catch(error => {
				console.error('Error creating beneficiary', error)
			})
	})

	// eslint-disable-next-line
	afterEach(() => {
		const deleteBeneficiary = async beneficiary => {
			try {
				const response = await axios.delete(
					`http://localhost:8080/api/v1/acat/patient/${beneficiary.id}`
				)
				return response.data
			} catch (error) {
				console.error(error)
				return null
			}
		}

		return deleteBeneficiary(createdBeneficiary)
	})

	jest.mock('axios')
	test('fetches successfully data from an API', async () => {
		axiosPostSpy = jest.spyOn(axios, 'post')
		mockBeneficiary.id = createdBeneficiary.id
		axiosPostSpy.mockResolvedValue({ data: mockBeneficiary })

		const beneficary = await fetchDataBeneficiary(
			createdBeneficiary.id,
			'http://localhost:8080/api/v1'
		)

		expect(beneficary).toEqual(mockBeneficiary)

		// Clean up the mock
		axiosPostSpy.mockRestore()
	})

	test('renders the beneficiary details', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		// Wait for the data to be fetched and rendered
		await screen.findByText(mockBeneficiary.name)

		// Assert that the beneficiary details are rendered correctly
		expect(screen.getByText(mockBeneficiary.name)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.nid)).toBeInTheDocument()
		expect(
			screen.getByText(
				mockBeneficiary.birth_date + ' (' + mockBeneficiary.age + ' años)'
			)
		).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.gender)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.address)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.contact_phone)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.dossier_number)).toBeInTheDocument()
		expect(
			screen.getByText(mockBeneficiary.first_technician)
		).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.observation)).toBeInTheDocument()
	})
})
