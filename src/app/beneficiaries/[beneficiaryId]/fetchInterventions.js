import axios from 'axios'
export async function fetchInterventionsBeneficiaryId() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const interventions = await axios.get(`${BASEURL}/acat/intervention`)
		return interventions.data.elements
	} catch (error) {
		return null
	}
}
