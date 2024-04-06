import axios from 'axios'
export async function fetchDataBeneficiaries(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		if (
			limit !== undefined &&
			limit !== null &&
			offset !== undefined &&
			offset !== null
		) {
			const beneficiaries = await axios.get(
				`${BASEURL}/acat/patient?limit=${limit}&offset=${offset}`
			)
			return beneficiaries.data
		} else {
			const beneficiaries = await axios.get(`${BASEURL}/acat/patient`)
			return beneficiaries.data
		}
	} catch (error) {
		return null
	}
}
