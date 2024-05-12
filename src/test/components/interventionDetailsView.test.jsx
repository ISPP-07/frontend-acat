/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'

import InterventionDetailsView from '../../app/components/InterventionDetailsView'

describe('InterventionDetailsView', () => {
	const mockIntervention = {
		patient: {
			alias: 'John Doe'
		},
		date: '2022-12-31T23:59:59',
		typology: 'Type A',
		technician: 'Jane Smith',
		reason: 'Reason A',
		observations: 'Observations A'
	}

	test('renders intervention details correctly', () => {
		render(<InterventionDetailsView intervention={mockIntervention} />)

		expect(screen.getByText('Paciente:')).toBeDefined()
		expect(screen.getByText('John Doe')).toBeDefined()

		expect(screen.getByText('Fecha de atención:')).toBeDefined()
		expect(screen.getByText('31-12-2022 23:59')).toBeDefined()

		expect(screen.getByText('Tipología:')).toBeDefined()
		expect(screen.getByText('Type A')).toBeDefined()

		expect(screen.getByText('Técnico:')).toBeDefined()
		expect(screen.getByText('Jane Smith')).toBeDefined()

		expect(screen.getByText('Motivo')).toBeDefined()
		expect(screen.getByText('Reason A')).toBeDefined()

		expect(screen.getByText('Observaciones:')).toBeDefined()
		expect(screen.getByText('Observations A')).toBeDefined()
	})
})
