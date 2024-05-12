/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import '@testing-library/jest-dom'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import axios from 'axios'
import BeneficiaryDetails from '../../app/beneficiaries/[beneficiaryId]/page.jsx'
import { fetchDataBeneficiary } from '../../app/beneficiaries/[beneficiaryId]/fetch.js'
import userEvent from '@testing-library/user-event'

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

	let createdBeneficiary = 'iniciado'
	let axiosPostSpy

	// eslint-disable-next-line
	beforeEach(() => {
		const createBeneficiary = async beneficiary => {
			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/acat/patient`,
					beneficiary,
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				return response.data
			} catch (error) {
				console.log(error)
				return null
			}
		}

		return createBeneficiary(mockBeneficiary)
			.then(data => {
				createdBeneficiary = data
			})
			.catch(error => {
				console.log('Error creating beneficiary', error)
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
				console.log(error)
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

		axiosPostSpy.mockRestore()
	})

	test('renders the beneficiary details', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		await screen.findByText(mockBeneficiary.name)

		expect(screen.getByText(mockBeneficiary.name)).toBeInTheDocument()
		expect(screen.getByText(mockBeneficiary.nid)).toBeInTheDocument()
		expect(
			screen.getByText(
				new Date('2023-03-28').toLocaleDateString('es-ES', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}) +
					' (' +
					mockBeneficiary.age +
					' años)'
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

	test('deletes the beneficiary view', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		await screen.findByText(mockBeneficiary.name)

		await act(async () => {
			screen.getByTestId('deleteButton').click()
		})
		const modal = await screen.findByTestId('modalConfirmation')
		expect(modal).toBeInTheDocument()
		screen.getByTestId('confirmButton').click()
	})

	test('delete the beneficiary edit', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		await screen.findByText(mockBeneficiary.name)

		await act(async () => {
			screen.getByTestId('editButton').click()
		})
		await act(async () => {
			screen.getByTestId('deleteButton').click()
		})
		const modal = await screen.findByTestId('modalConfirmation')
		expect(modal).toBeInTheDocument()
		screen.getByTestId('confirmButton').click()
	})

	test('edit the beneficiary', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		await screen.findByText(mockBeneficiary.name)

		await act(async () => {
			screen.getByTestId('is_rehabilitated').click()
		})

		await act(async () => {
			screen.getByTestId('editButton').click()
		})

		await userEvent.type(screen.getByTestId('name'), 'AChanged')
		await userEvent.type(screen.getByTestId('nid'), '00000000R')
		await userEvent.selectOptions(screen.getByTestId('gender'), ['Woman'])
		await userEvent.type(screen.getByTestId('address'), 'FChanged')
		await userEvent.type(screen.getByTestId('contact_phone'), '111111111')
		await userEvent.type(screen.getByTestId('dossier_number'), 'HChanged')
		await userEvent.type(screen.getByTestId('first_technician'), 'IChanged')
		fireEvent.change(screen.getByTestId('birth_date'), {
			target: { value: '2022-01-01' }
		})
		fireEvent.change(screen.getByTestId('observation'), {
			target: { value: 'JChanged' }
		})

		await act(async () => {
			screen.getByTestId('saveButton').click()
		})

		await screen.findByText('AChanged')
		expect(screen.getByText('AChanged')).toBeInTheDocument()
		await screen.findByText('00000000R')
		expect(screen.getByText('00000000R')).toBeInTheDocument()
		await screen.findByText('Woman')
		expect(screen.getByText('Woman')).toBeInTheDocument()
		await screen.findByText('FChanged')
		expect(screen.getByText('FChanged')).toBeInTheDocument()
		await screen.findByText('111111111')
		expect(screen.getByText('111111111')).toBeInTheDocument()
		await screen.findByText('HChanged')
		expect(screen.getByText('HChanged')).toBeInTheDocument()
		await screen.findByText('IChanged')
		expect(screen.getByText('IChanged')).toBeInTheDocument()
		await screen.findByText('JChanged')
		expect(screen.getByText('JChanged')).toBeInTheDocument()
	})

	test('check validation error', async () => {
		const params = {
			beneficiaryId: createdBeneficiary.id,
			url: 'http://localhost:8080/api/v1'
		}
		render(<BeneficiaryDetails params={params} />)

		await screen.findByText(mockBeneficiary.name)

		await act(async () => {
			screen.getByTestId('is_rehabilitated').click()
		})

		await act(async () => {
			screen.getByTestId('editButton').click()
		})

		await userEvent.type(screen.getByTestId('nid'), '00031')
		await userEvent.type(screen.getByTestId('contact_phone'), ' ')
		fireEvent.change(screen.getByTestId('birth_date'), {
			target: { value: '2032-01-01' }
		})

		await act(async () => {
			screen.getByTestId('saveButton').click()
		})

		await screen.findByText('FINALIZADO')
		expect(
			screen.getByText(
				'El DNI/NIE/Pasaporte no coincide con el formato esperado'
			)
		).toBeInTheDocument()
		expect(
			screen.getByText('La fecha de nacimiento debe ser pasada')
		).toBeInTheDocument()
		expect(screen.getByText('El teléfono no es válido')).toBeInTheDocument()
	})
})
