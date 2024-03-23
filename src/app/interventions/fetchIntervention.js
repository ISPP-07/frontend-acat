import axios from 'axios'
export async function fetchDataInterventions() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try{
		const interventions = await axios.get(
			`${BASEURL}/acat/intervention`
		)
		return interventions.data
	}
	catch (error) {
		return null
	}
}