/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render, fireEvent } from '@testing-library/react'
import { test, expect, describe, jest } from '@jest/globals'
import Page from '../../app/beneficiaries/page.jsx'
import CreateModal from '../../app/beneficiaries/create.jsx'

jest.mock('next/navigation', () => ({
	useRouter() {
		return {
			prefetch: () => null
		}
	}
}))

describe('Page', () => {
	test('Página base', () => {
		const paginaPrincipal = render(<Page />)
		const button = paginaPrincipal.getByText('Dar de alta')
		expect(button).toBeDefined()
	})

	test('Pressing button', async () => {
		const paginaPrincipal = render(<Page />)
		const button = paginaPrincipal.getByText('Dar de alta')
		fireEvent.submit(button)
	})
	test('Data check ', () => {
		const { getByText } = render(<CreateModal isVisible={true} />)
		const name = getByText('Nombre')
		expect(name).toBeDefined()
		fireEvent.click(name)

		const dni = getByText('DNI')
		expect(dni).toBeDefined()
		fireEvent.click(dni)

		const fechaNacimiento = getByText('Fecha de nacimiento')
		expect(fechaNacimiento).toBeDefined()
		fireEvent.click(fechaNacimiento)

		const direccion = getByText('Dirección')
		expect(direccion).toBeDefined()
		fireEvent.click(direccion)

		const sexo = getByText('Sexo')
		expect(sexo).toBeDefined()
		fireEvent.click(sexo)

		const telefono = getByText('Teléfono')
		expect(telefono).toBeDefined()
		fireEvent.click(telefono)

		const primeraAtencion = getByText('Primera atención')
		expect(primeraAtencion).toBeDefined()
		fireEvent.click(primeraAtencion)

		const tecnico = getByText('Técnico')
		expect(tecnico).toBeDefined()
		fireEvent.click(tecnico)

		const observaciones = getByText('Observaciones')
		expect(observaciones).toBeDefined()
		fireEvent.click(observaciones)
	})
	jest.mock('axios')

	test('Data Injection ', async () => {
		// Renderiza el componente
		const { getByPlaceholderText, getByText } = render(
			<CreateModal isVisible={true} />
		)

		// Simula añadir datos a los campos de entrada
		fireEvent.change(getByPlaceholderText('Usuario'), {
			target: { value: 'Juan' }
		})
		fireEvent.change(getByPlaceholderText('DNI'), {
			target: { value: '12345678A' }
		})
		fireEvent.change(getByPlaceholderText('Dirección'), {
			target: { value: 'Calle Principal 123' }
		})
		fireEvent.change(getByPlaceholderText('Sexo'), {
			target: { value: 'Masculino' }
		})
		fireEvent.change(getByPlaceholderText('Teléfono'), {
			target: { value: '123456789' }
		})
		fireEvent.change(getByPlaceholderText('Técnico que lo ha atendido'), {
			target: { value: 'John Doe' }
		})
		fireEvent.change(
			getByPlaceholderText('Observaciones sobre el beneficiario'),
			{ target: { value: 'Ninguna' } }
		)
		fireEvent.click(getByText('Registrar'))
	})

	test('Modal open and close', () => {
		const { getByText, queryByText } = render(<CreateModal />)
		expect(queryByText('Nombre')).toBeNull()
		const paginaPrincipal = render(<Page />)
		const button = paginaPrincipal.getByText('Dar de alta')
		fireEvent.click(button)
		// Verifica que el modal esté abierto
		expect(getByText('Nombre')).toBeDefined()
		// Simula hacer clic en el botón para cerrar el modal
		fireEvent.click(getByText('X'))
		// Verifica que el modal esté cerrado
		expect(queryByText('Nombre')).toBeNull()
	})
})
