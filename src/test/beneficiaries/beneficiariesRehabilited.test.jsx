/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import BeneficiariesList from '../../app/beneficiaries/rehabilited/page.jsx'
import { Rehabilited } from '../../app/beneficiaries/rehabilited/fetch.js'

jest.mock('../../app/beneficiaries/rehabilited/fetch.js')
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
	test('Renderizar', async () => {
		const datos = [
			{ id: 1, name: 'John Doe', is_rehabilitated: true },
			{ id: 2, name: 'Jane Doe', is_rehabilitated: true }
		]

		Rehabilited.mockResolvedValue(datos)

		const data = await Rehabilited()

		expect(data).toEqual(datos)
		waitFor(async () => {
			render(<BeneficiariesList />)
			await expect(screen.findByText('John Doe')).toBeDefined
			await expect(screen.findByText('Jane Doe')).toBeDefined
		})
	})
})
