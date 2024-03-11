import axios from 'axios'
export function fetchDataBeneficiaries() {
	const BASEURL = process.env.BASEURL
	try{
		const beneficiaries = axios.get(
			`${BASEURL}/acat/patient`
		)
		return beneficiaries.then(response => {
			return response.data
		})
	}
    catch (error) {
		return null
	}
}
