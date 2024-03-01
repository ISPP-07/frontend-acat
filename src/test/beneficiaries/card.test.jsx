/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import { render } from '@testing-library/react'
import { test, expect, describe } from '@jest/globals'
import Card from '../../app/beneficiaries/card.jsx'

describe('Card', () => {
	test('renders Card component without crashing', () => {
		render(
			<Card
				beneficiary={{
					alias: 'John Doe',
					birthday: '1990-01-01',
					interventions: [],
					isFinished: false
				}}
			/>
		)
	})

	test('renders Card component with beneficiary data', () => {
		const beneficiaryData = {
			alias: 'John Doe',
			birthday: '1990-01-01',
			interventions: [{}],
			isFinished: false
		}
		render(<Card beneficiary={beneficiaryData} />)
	})

	test('calculates age correctly', () => {
		const calculateAge = birthday => {
			const birthdayDate = new Date(birthday)
			const currentDate = new Date()

			let age = currentDate.getFullYear() - birthdayDate.getFullYear()
			const monthDiff = currentDate.getMonth() - birthdayDate.getMonth()

			if (
				monthDiff < 0 ||
				(monthDiff === 0 && currentDate.getDate() < birthdayDate.getDate())
			) {
				age--
			}

			return age
		}
		const birthday = '1990-02-01'
		// Calcula la edad esperada
		const currentDate = new Date()
		const expectedAge =
			currentDate.getFullYear() - new Date(birthday).getFullYear()

		// Llama a la función calculateAge con la fecha ficticia
		const age = calculateAge(birthday)

		// Compara la edad calculada con la edad esperada
		expect(age).toBe(expectedAge)
	})

	test('test 2', () => {
		const beneficiariesData = [
			{
				id: 1,
				alias: 'Beneficiary 1',
				birthday: '1990-01-01',
				interventions: [{}],
				isFinished: false
			},
			{
				id: 2,
				alias: 'Beneficiary 2',
				birthday: '1985-05-15',
				interventions: [{}],
				isFinished: true
			}
		]

		const { getByText } = render(
			<div>
				{beneficiariesData.map(beneficiary => (
					<Card key={beneficiary.id} beneficiary={beneficiary} />
				))}
			</div>
		)
		beneficiariesData.forEach(beneficiary => {
			expect(getByText(beneficiary.alias)).toBeDefined()

			if (beneficiary.isFinished) {
				expect(getByText('Finalizado')).toBeDefined()
			}
		})
	})
})
