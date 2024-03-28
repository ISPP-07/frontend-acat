import axios from 'axios'
export async function fetchDataBeneficiary(beneficiaryId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const beneficiarie = await axios.get(
			`${BASEURL}/acat/patient/${beneficiaryId}`
		)
		return beneficiarie.data
	} catch (error) {
		return null
	}
}
