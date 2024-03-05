import axios from 'axios'
export function fetchDataBeneficiary(beneficiaryId) {
	const beneficiaries = axios.get(
		'https://65dc59f1e7edadead7ebb34d.mockapi.io/api/v1/beneficiaries/' +
			beneficiaryId
	)
	return beneficiaries.then(response => {
		return response.data
	})
}
