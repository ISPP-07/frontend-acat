import axios from 'axios'
export async function fetchInterventionsBeneficiaryId(beneficiaryId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const interventions = await axios.get(
			`${BASEURL}/acat/intervention?patient=${beneficiaryId}`
		)
		return interventions.data.elements
	} catch (error) {
		return null
	}
}
