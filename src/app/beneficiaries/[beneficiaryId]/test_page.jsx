import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import axios from 'axios'
import BeneficiaryDetails from '../../app/beneficiaries/[beneficiaryId]/page'

jest.mock('axios')

describe('BeneficiaryDetails', () => {
	const mockParams = {
		beneficiaryId: '123'
	}

	const mockBeneficiary = {
		name: 'John Doe',
		contact_phone: '1234567890',
		address: '123 Main St',
		dossier_number: 'ABC123',
		nid: '12345678A',
		birth_date: '1990-01-01',
		first_technician: 'Jane Smith',
		gender: 'Male',
		observation: 'Lorem ipsum dolor sit amet',
		is_rehabilitated: false
	}

	beforeEach(() => {
		axios.get.mockResolvedValueOnce({ data: mockBeneficiary })
	})

	test('renders the beneficiary details', async () => {
		render(<BeneficiaryDetails params={mockParams} />)

		// Wait for the data to be fetched and rendered
		await screen.findByText(mockBeneficiary.name)

		// Assert that the beneficiary details are rendered correctly
		expect(screen.getByText(mockBeneficiary.name)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.contact_phone)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.address)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.dossier_number)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.nid)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.birth_date)).toBeInTheDocument()
		expect(
			screen.getByText(mockBeneficiary.first_technician)
		).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.gender)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.observation)).toBeInTheDocument()
		expect(screen.getByLabelText('FINALIZADO')).toBeInTheDocument()
	})

	test('toggles edit view when edit button is clicked', async () => {
		render(<BeneficiaryDetails params={mockParams} />)

		// Wait for the data to be fetched and rendered
		await screen.findByText(mockBeneficiary.name)

		// Click the edit button
		fireEvent.click(screen.getByAltText('Edit'))

		// Assert that the edit view is toggled
		expect(screen.getByLabelText('Save')).toBeInTheDocument()
	})

	test('toggles delete view when delete button is clicked', async () => {
		render(<BeneficiaryDetails params={mockParams} />)

		// Wait for the data to be fetched and rendered
		await screen.findByText(mockBeneficiary.name)

		// Click the delete button
		fireEvent.click(screen.getByAltText('Delete'))

		// Assert that the delete view is toggled
		expect(screen.getByLabelText('Confirm Delete')).toBeInTheDocument()
	})

	// Add more tests for other functionality as needed
})
