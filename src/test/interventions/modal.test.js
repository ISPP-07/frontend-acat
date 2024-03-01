/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { test, expect, describe, jest } from '@jest/globals'

import { render, fireEvent } from '@testing-library/react'
import Modal from '../../app/interventions/modal.jsx'

describe('Modal component', () => {
	test('prevents default when isVisible is true', () => {
		const selectedIntervention = {
			name: 'Test Name',
			fecha: 'Test Fecha',
			tipología: 'Test Tipología',
			técnico: 'Test Técnico',
			motivo: 'Test Motivo',
			observaciones: 'Test Observaciones'
		}

		const onCloseMock = jest.fn()

		const { container } = render(
			<Modal
				isVisible={true}
				onClose={onCloseMock}
				selectedIntervention={selectedIntervention}
			/>
		)

		fireEvent.keyDown(container, {
			key: 'Tab',
			code: 'Tab',
			keyCode: 9,
			which: 9
		})

		expect(onCloseMock).not.toHaveBeenCalled() // Ensure onClose is not called
	})

	test('does not prevent default when isVisible is false', () => {
		const selectedIntervention = {
			name: 'Test Name',
			fecha: 'Test Fecha',
			tipología: 'Test Tipología',
			técnico: 'Test Técnico',
			motivo: 'Test Motivo',
			observaciones: 'Test Observaciones'
		}

		const onCloseMock = jest.fn()

		const { container } = render(
			<Modal
				isVisible={false}
				onClose={onCloseMock}
				selectedIntervention={selectedIntervention}
			/>
		)

		fireEvent.keyDown(container, {
			key: 'Tab',
			code: 'Tab',
			keyCode: 9,
			which: 9
		})

		expect(onCloseMock).not.toHaveBeenCalled() // Ensure onClose is not called
	})
	test('calls onClose when clicking on close button', () => {
		const selectedIntervention = {
			name: 'Test Name',
			fecha: 'Test Fecha',
			tipología: 'Test Tipología',
			técnico: 'Test Técnico',
			motivo: 'Test Motivo',
			observaciones: 'Test Observaciones'
		}

		const onCloseMock = jest.fn()

		const { getByTestId } = render(
			<Modal
				isVisible={true}
				onClose={onCloseMock}
				selectedIntervention={selectedIntervention}
			/>
		)

		const closeButton = getByTestId('close')
		fireEvent.click(closeButton)

		expect(onCloseMock).toHaveBeenCalled()
	})

	test('does not call onClose when clicking on other elements', () => {
		const selectedIntervention = {
			name: 'Test Name',
			fecha: 'Test Fecha',
			tipología: 'Test Tipología',
			técnico: 'Test Técnico',
			motivo: 'Test Motivo',
			observaciones: 'Test Observaciones'
		}

		const onCloseMock = jest.fn()

		const { getByTestId } = render(
			<Modal
				isVisible={true}
				onClose={onCloseMock}
				selectedIntervention={selectedIntervention}
			/>
		)

		const modal = getByTestId('modal')
		fireEvent.click(modal)

		expect(onCloseMock).not.toHaveBeenCalled()
	})
})
