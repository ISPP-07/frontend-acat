/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import axios from 'axios'
import Page from '../../app/interventions/[interventionId]/page.jsx'
import InterventionDetails from '../../app/components/InterventionDetails.jsx'
import { fetchDataIntervention } from '../../app/interventions/[interventionId]/fetch.js'

function formatDate(dateString) {
	const date = new Date(dateString)
	let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} `
	if (date.getHours() < 10) {
		formattedDate += `0${date.getHours()}:`
	} else {
		formattedDate += `${date.getHours()}:`
	}
	if (date.getMinutes() < 10) {
		formattedDate += `0${date.getMinutes()}`
	} else {
		formattedDate += `${date.getMinutes()}`
	}
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
describe('InterventionDetails', () => {
	const mockIntervention = {
		date: '2024-03-30T12:10:44.512Z',
		reason: 'Dolor',
		typology: 'Medica',
		observations: 'Dedo roto',
		patient_id: '17ae5897-b615-4cb7-b4ad-1b44707132d8',
		technician: 'Hola'
	}

	const expectResponse = {
		id: '52ef1f58-7c61-4f8a-9585-70544596f9be',
		date: '2024-03-30T12:10:44.512000Z',
		reason: 'Dolor',
		typology: 'Medica',
		observations: 'Dedo roto',
		technician: 'Hola',
		patient: {
			id: '17ae5897-b615-4cb7-b4ad-1b44707132d8',
			name: 'string',
			first_surname: 'string',
			second_surname: 'string',
			alias: 'string',
			nid: 'string',
			birth_date: '2024-03-28',
			gender: 'Man',
			address: 'string',
			contact_phone: 'string',
			dossier_number: 'string',
			is_rehabilitated: false,
			first_technician: 'string',
			registration_date: '2024-03-30',
			observation: 'string'
		}
	}

	let createdIntervention = 'iniciado'
	let axiosPostSpy

	// eslint-disable-next-line
	beforeEach(() => {
		const createIntervetion = async intervention => {
			try {
				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BASE_URL}/acat/intervention`,
					intervention,
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

		return createIntervetion(mockIntervention)
			.then(data => {
				createdIntervention = data
			})
			.catch(error => {
				console.log('Error creating beneficiary', error)
			})
	})

	// eslint-disable-next-line
	afterEach(() => {
		const deleteIntervention = async intervention => {
			try {
				const response = await axios.delete(
					`http://localhost:8080/api/v1/acat/intervention/${intervention.id}`
				)
				return response.data
			} catch (error) {
				console.log(error)
				return null
			}
		}

		return deleteIntervention(createdIntervention)
	})

	jest.mock('axios')
	test('fetches successfully data from an API', async () => {
		axiosPostSpy = jest.spyOn(axios, 'post')
		mockIntervention.id = createdIntervention.id
		axiosPostSpy.mockResolvedValue({ data: mockIntervention })

		const intervention = await fetchDataIntervention(
			createdIntervention.id,
			'http://localhost:8080/api/v1'
		)

		intervention.id = '52ef1f58-7c61-4f8a-9585-70544596f9be'
		expect(intervention).toEqual(expectResponse)

		axiosPostSpy.mockRestore()
	})

	test('renders the intervention details', async () => {
		render(<InterventionDetails intervention={expectResponse} />)

		await screen.findByText('Detalles de la intervención')

		console.log(expectResponse.technician)

		expect(
			screen.getByText(formatDate(expectResponse.date))
		).toBeInTheDocument()
		expect(screen.getByText(expectResponse.technician)).toBeInTheDocument()
		expect(screen.getByText(expectResponse.reason)).toBeInTheDocument()
		expect(screen.getByText(expectResponse.observations)).toBeInTheDocument()
		expect(screen.getByText(expectResponse.typology)).toBeInTheDocument()
	})

	test('deletes the intervention view', async () => {
		render(<Page params={{ id: expectResponse.id }} />)

		await screen.findByText('Detalles de la intervención')

		await act(async () => {
			screen.getByTestId('deleteButton').click()
		})
		const modal = await screen.findByTestId('modalConfirmation')
		expect(modal).toBeInTheDocument()
		screen.getByTestId('confirmButton').click()
	})
})
