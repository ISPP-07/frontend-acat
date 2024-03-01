/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import Page from '../../app/beneficiaries/page.jsx'
import CreateModal from '../../app/beneficiaries/create.jsx'

describe('Page', () => {
	test('Página base', () => {
		const { getByText } = render(<Page />)
		const button = getByText('Dar de alta')
		expect(button).toBeDefined()
	})
	test('Modal', () => {
		render(<CreateModal />)
		expect('Registro de Beneficiarios').toBeDefined()
		expect('Nombre').toBeDefined()
		expect('DNI').toBeDefined()
		expect('Fecha de nacimiento').toBeDefined()
		expect('Dirección').toBeDefined()
		expect('Sexo').toBeDefined()
		expect('Teléfono').toBeDefined()
		expect('Primera atención').toBeDefined()
		expect('Técnico').toBeDefined()
		expect('Observaciones').toBeDefined()
	})
})
