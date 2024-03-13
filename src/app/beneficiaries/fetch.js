import axios from 'axios'
export async function fetchDataBeneficiaries() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try{
		const beneficiaries = await axios.get(
			`${BASEURL}/acat/patient/`)
		return beneficiaries.data
	}
    catch (error) {
		return null
	}
}
