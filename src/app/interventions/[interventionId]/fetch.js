import axios from 'axios'

export async function fetchDataIntervention(
	interventionId,
	url = process.env.NEXT_PUBLIC_BASE_URL
) {
	try {
		const intervention = await axios
			.get(`${url}/acat/intervention/${interventionId}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})

		return intervention.data
	} catch (error) {
		return null
	}
}
