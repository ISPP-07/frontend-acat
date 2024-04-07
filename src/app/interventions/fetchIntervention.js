import axios from 'axios'
export async function fetchDataInterventions(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const interventions = await axios.get(
			`${BASEURL}/acat/intervention?limit=${limit}&offset=${offset}`
		)
		return interventions.data
	} catch (error) {
		return null
	}
}
