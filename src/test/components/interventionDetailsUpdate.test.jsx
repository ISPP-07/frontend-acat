/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import InterventionDetailsUpdate from '../../app/components/InterventionDetailsUpdate'

describe('InterventionDetailsUpdate', () => {
	const intervention = {
		patient: {
			alias: 'John Doe'
		},
		date: '2022-12-31T23:59',
		typology: 'Type A',
		technician: 'Jane Smith',
		reason: 'Reason A',
		observations: 'Observations'
	}

	const errors = {
		date: 'Invalid date',
		typology: 'Invalid typology',
		technician: 'Invalid technician',
		reason: 'Invalid reason'
	}

	const onSubmit = jest.fn()

	// eslint-disable-next-line
	beforeEach(() => {
		render(
			<InterventionDetailsUpdate
				intervention={intervention}
				errors={errors}
				onSubmit={onSubmit}
			/>
		)
	})

	test('renders the patient alias', () => {
		expect(screen.getByText('Paciente:')).toBeDefined()
		expect(screen.getByText('John Doe')).toBeDefined()
	})

	test('renders the date input with default value', () => {
		const dateInput = screen.getByTestId('date')
		expect(dateInput).toBeDefined()
		expect(dateInput.value).toBe('2022-12-31T23:59')
	})

	test('renders the typology input with default value', () => {
		const typologyInput = screen.getByTestId('typology')
		expect(typologyInput).toBeDefined()
		expect(typologyInput.value).toBe('Otro')
	})

	test('renders the technician input with default value', () => {
		const technicianInput = screen.getByTestId('technician')
		expect(technicianInput).toBeDefined()
		expect(technicianInput.value).toBe('Jane Smith')
	})

	test('renders the reason input with default value', () => {
		const reasonInput = screen.getByTestId('reason')
		expect(reasonInput).toBeDefined()
		expect(reasonInput.value).toBe('Reason A')
	})

	test('renders the observations textarea with default value', () => {
		const observationsTextarea = screen.getByTestId('observations')
		expect(observationsTextarea).toBeDefined()
		expect(observationsTextarea.value).toBe('Observations')
	})

	test('renders the error message for date', () => {
		expect(screen.getByText('Invalid date')).toBeDefined()
	})

	test('renders the error message for typology', () => {
		expect(screen.getByText('Invalid typology')).toBeDefined()
	})

	test('renders the error message for technician', () => {
		expect(screen.getByText('Invalid technician')).toBeDefined()
	})

	test('renders the error message for reason', () => {
		expect(screen.getByText('Invalid reason')).toBeDefined()
	})

	test('calls onSubmit when the form is submitted', () => {
		const form = screen.getByTestId('form')
		fireEvent.submit(form)
		expect(onSubmit).toHaveBeenCalled()
	})
})
