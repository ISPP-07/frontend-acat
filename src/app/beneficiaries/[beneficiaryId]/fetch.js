import axios from 'axios'
export function fetchDataBeneficiary(beneficiaryId) {
	const BASEURL = process.env.BASEURL
	const beneficiaries = axios.get(
		`${BASEURL}/acat/patient/details/${beneficiaryId}`
	)
	return beneficiaries
		.then(response => {
			return response.data
		})
		.catch(error => {
			throw error
		})
}
