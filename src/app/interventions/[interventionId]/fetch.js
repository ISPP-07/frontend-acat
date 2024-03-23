import axios from 'axios'
export async function fetchDataIntervention(interventionId) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try{
		const intervention = await axios.get(`${BASEURL}/acat/intervention/${interventionId}`)
		return intervention.data
	}
	catch (error) {
		return null
	}
}
