import axios from 'axios'
export function fetchDataBeneficiaries() {
	const BASEURL = process.env.BASEURL
	try{
		const beneficiaries = axios.get(
			`${BASEURL}/acat/patient`)
		return beneficiaries.data
	}
    catch (error) {
		return null
	}
}
