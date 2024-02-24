import axios from 'axios'
export function fetchDataBeneficiaries() {
	const beneficiaries = axios.get(
		'https://65d9c9f1bcc50200fcdc1cb8.mockapi.io/Beneficiaries'
	)
	return beneficiaries.then(response => {
		return response.data
	})
}
