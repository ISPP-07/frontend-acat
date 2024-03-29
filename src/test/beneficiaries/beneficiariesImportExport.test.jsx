/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import axios from 'axios' // Mock axios
import BeneficiariesPage from '../../app/beneficiaries/page.jsx'
import { test, expect, describe, jest } from '@jest/globals'
import { fetchDataBeneficiary } from '../../app/beneficiaries/[beneficiaryId]/fetch.js'

// Mocking axios post function
jest.mock('axios')
jest.mock('../../app/beneficiaries/[beneficiaryId]/fetch.js')
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

describe('BeneficiariesList', () => {
	test('import button', async () => {
		render(<BeneficiariesPage />)

		const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {})

		const mockData = [
			{
				id: 1,
				intervention_date: '2018-05-08T16:29:31.591Z',
				patient: 'John Doe'
			}
		]

		// Mocking fetchDataFoods function
		fetchDataBeneficiary.mockResolvedValue(mockData)

		const fileInput = screen.queryByTestId('file')

		// Generate a file to upload
		const file = new File(['test.xls'], 'test.xls', {
			type: 'application/vnd.ms-excel'
		})

		// Simulate file upload
		await waitFor(() => {
			fireEvent.change(fileInput, {
				target: { files: [file] }
			})
		})

		// Ensure axios.post is called with correct argumentsj
		expect(axios.post).toHaveBeenCalledWith(
			'url/de/import',
			expect.any(FormData),
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		)

		expect(alertSpy).toHaveBeenCalledWith('Datos importados correctamente')

		// Simulate error during import
		axios.post.mockRejectedValueOnce(new Error('Some error'))

		await fireEvent.change(fileInput, {
			target: { files: [new File(['test.xls'], 'test.xls')] }
		})

		expect(alertSpy).toHaveBeenCalledWith('Error al importar los datos')
		alertSpy.mockRestore()
	})

	test('import button rehabilited', async () => {
		render(<BeneficiariesPage />)

		const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {})

		const mockData = [
			{
				id: 1,
				intervention_date: '2018-05-08T16:29:31.591Z',
				patient: 'John Doe'
			}
		]

		// Mocking fetchDataFoods function
		fetchDataBeneficiary.mockResolvedValue(mockData)

		const fileInput = screen.queryByTestId('file')

		// Generate a file to upload
		const file = new File(['test.xls'], 'test.xls', {
			type: 'application/vnd.ms-excel'
		})

		// Simulate file upload
		await waitFor(() => {
			fireEvent.change(fileInput, {
				target: { files: [file] }
			})
		})

		// Ensure axios.post is called with correct argumentsj
		expect(axios.post).toHaveBeenCalledWith(
			'url/de/import',
			expect.any(FormData),
			{ headers: { 'Content-Type': 'multipart/form-data' } }
		)

		expect(alertSpy).toHaveBeenCalledWith('Datos importados correctamente')

		// Simulate error during import
		axios.post.mockRejectedValueOnce(new Error('Some error'))

		await fireEvent.change(fileInput, {
			target: { files: [new File(['test.xls'], 'test.xls')] }
		})

		expect(alertSpy).toHaveBeenCalledWith('Error al importar los datos')
		alertSpy.mockRestore()
	})
})
