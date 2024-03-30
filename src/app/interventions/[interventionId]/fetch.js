import axios from 'axios'
export async function fetchDataIntervention(
	interventionId,
	url = process.env.NEXT_PUBLIC_BASE_URL
) {
	try {
		const intervention = await axios.get(
			`${url}/acat/intervention/${interventionId}`
		)
		return intervention.data
	} catch (error) {
		return null
	}
}
