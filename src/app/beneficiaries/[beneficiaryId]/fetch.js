import axios from 'axios'
export async function fetchDataBeneficiary(
	beneficiaryId,
	url = process.env.NEXT_PUBLIC_BASE_URL
) {
	try {
		const beneficiarie = await axios.get(`${url}/acat/patient/${beneficiaryId}`)
		return beneficiarie.data
	} catch (error) {
		console.log(error)
		return null
	}
}
