import axios from 'axios'

export async function fetchDataBeneficiary(
	beneficiaryId,
	url = process.env.NEXT_PUBLIC_BASE_URL
) {
	try {
		const beneficiarie = await axios
			.get(`${url}/acat/patient/${beneficiaryId}`)
			.catch(err => {
				if (err.response.status === 403 || err.response.status === 401) {
					// redirect to login
					window.location.href = '/'
				}
			})

		return beneficiarie.data
	} catch (error) {
		console.log(error)
		return null
	}
}
