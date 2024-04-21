import axios from 'axios'

export async function Rehabilited() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		const beneficiaries = await axios
			.get(`${BASEURL}/acat/patient/`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})

		return beneficiaries.data.elements.filter(
			patient => patient.is_rehabilitated === true
		)
	} catch (error) {
		return null
	}
}
