/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import BeneficiariesList from '../../app/beneficiaries/page.jsx'
import { fetchDataBeneficiaries } from '../../app/beneficiaries/fetch.js'
import axios from 'axios'

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
	jest.mock('axios')
	test('Renderizar', async () => {
		const datos = {
			elements: [
				{ id: 1, name: 'John Doe' },
				{ id: 2, name: 'Jane Doe' }
			],
			total_elements: 2
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		axiosSpy.mockResolvedValue({ data: datos })
		const loaderSpy = jest.spyOn(document, 'getElementById')

		const add = some => true
		const remove = some => true

		loaderSpy.mockReturnValue({ classList: { add, remove } })

		const data = await fetchDataBeneficiaries()

		expect(data).toEqual(datos)

		render(<BeneficiariesList />)
		await expect(screen.findByText('John Doe')).toBeDefined
		await expect(screen.findByText('Jane Doe')).toBeDefined
	})
	test('Abrir modal', async () => {
		const datos = {
			elements: [
				{ id: 1, name: 'John Doe' },
				{ id: 2, name: 'Jane Doe' }
			],
			total_elements: 2
		}

		const axiosSpy = jest.spyOn(axios, 'get')
		const loaderSpy = jest.spyOn(document, 'getElementById')
		axiosSpy.mockResolvedValue({ data: datos })
		const add = some => true
		const remove = some => true

		loaderSpy.mockReturnValue({ classList: { add, remove } })

		render(<BeneficiariesList />)
		const createBeneficiary = await screen.findByText('Dar de alta')
		createBeneficiary.click()

		const axiosPostSpy = jest.spyOn(axios, 'post')
		axiosPostSpy.mockResolvedValue()

		const submitButton = await screen.findByTestId('submit')
		expect(submitButton).toBeDefined()

		const observationTextValue = 'This is a mock observation text'
		const firstTechnicianValue = 'John Doe'
		const firstAppointmentDateValue = '2024-05-10' // Assuming date format YYYY-MM-DD
		const contactPhoneValue = '123-456-7890'
		const addressValue = '123 Main St, City, Country'
		const birthDateValue = '1990-01-01' // Assuming date format YYYY-MM-DD
		const dossierNumberValue = 'ABC123456'
		const secondSurnameValue = 'Smith'
		const firstSurnameValue = 'García'

		const name = await screen.findByTestId('name')
		fireEvent.change(name, { target: { value: 'Juan' } })

		const observationText = await screen.findByTestId('observation_text')
		fireEvent.change(observationText, {
			target: { value: observationTextValue }
		})

		const firstTechnician = await screen.findByTestId('first_technician')
		fireEvent.change(firstTechnician, {
			target: { value: firstTechnicianValue }
		})

		const firstAppointmentDate = await screen.findByTestId(
			'first_appointment_date'
		)
		fireEvent.change(firstAppointmentDate, {
			target: { value: firstAppointmentDateValue }
		})

		const contactPhone = await screen.findByTestId('contact_phone')
		fireEvent.change(contactPhone, { target: { value: contactPhoneValue } })

		const address = await screen.findByTestId('address')
		fireEvent.change(address, { target: { value: addressValue } })

		const birthDate = await screen.findByTestId('birth_date')
		fireEvent.change(birthDate, { target: { value: birthDateValue } })

		const dossierNumber = await screen.findByTestId('dossier_number')
		fireEvent.change(dossierNumber, { target: { value: dossierNumberValue } })
		const nid = await screen.findByTestId('nid')
		fireEvent.change(nid, { target: { value: '79466642D' } })

		const secondSurname = await screen.findByTestId('second_surname')
		fireEvent.change(secondSurname, { target: { value: secondSurnameValue } })

		const firstSurname = await screen.findByTestId('first_surname')
		fireEvent.change(firstSurname, { target: { value: firstSurnameValue } })

		submitButton.click()
		console.log(firstSurname)
	})
})
