/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios' // Mock axios
import BeneficiariesList from '../../app/beneficiaries/page.jsx'
import { fetchDataBeneficiaries } from '../../app/beneficiaries/fetch.js'
import { exportData } from '../../app/exportData.js'
import { test, expect, describe, jest } from '@jest/globals'

// Mocking axios post function
jest.mock('axios')
jest.mock('../../app/beneficiaries/fetch.js')

describe('BeneficiariesList', () => {
	test('export button', () => {
		const mockData = [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]
		fetchDataBeneficiaries.mockResolvedValue(mockData)

		waitFor(async () => {
			const { getByTestId } = render(<BeneficiariesList />)

			const exportButton = getByTestId('export-button')
			fireEvent.click(exportButton)

			// Ensure exportData is called with correct arguments
			expect(exportData).toHaveBeenCalledWith(mockData, 'Beneficiados')
		})
	})

	test('import button', async () => {
		const mockData = [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' }
		]

		// Mocking fetchDataFoods function
		fetchDataBeneficiaries.mockResolvedValue(mockData)

		waitFor(async () => {
			render(<BeneficiariesList />)

			fireEvent.click(screen.getByLabelText('Importar datos'))

			// Ensure axios.post is called with correct arguments
			expect(axios.post).toHaveBeenCalledWith(
				'url/de/import',
				expect.any(FormData),
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			)

			// Simulate error during import
			axios.post.mockRejectedValueOnce(new Error('Some error'))

			fireEvent.change(screen.getByLabelText('file'), {
				target: { files: [new File(['test.xls'], 'test.xls')] }
			})

			await screen.findByText('Error al importar los datos')
		})
	})
})
