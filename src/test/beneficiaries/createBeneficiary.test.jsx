/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import CreateModal from '../../app/beneficiaries/create'

jest.mock('axios')
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

describe('CreateModal', () => {
	test('renders CreateModal component without crashing', () => {
		render(<CreateModal />)
		expect(screen.getByText('Nombre')).toBeDefined()
		expect(screen.getByText('Primer apellido')).toBeDefined()
		expect(screen.getByText('Segundo apellido')).toBeDefined()
	})
	test('on submit', () => {
		const { getByTestId } = render(<CreateModal />)
		const submitButton = getByTestId('form')
		expect(submitButton).toBeDefined()
	})
})
