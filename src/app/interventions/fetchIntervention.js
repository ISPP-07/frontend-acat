import axios from 'axios'

export async function fetchDataInterventions(limit, offset) {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const interventions = await axios
			.get(`${BASEURL}/acat/intervention?limit=${limit}&offset=${offset}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})

		return interventions.data
	} catch (error) {
		return null
	}
}
