import axios from 'axios'
import { createAxiosInterceptors } from '../axiosConfig'

export async function fetchDataBeneficiaries(limit, offset) {
	createAxiosInterceptors()
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try {
		if (
			limit !== undefined &&
			limit !== null &&
			offset !== undefined &&
			offset !== null
		) {
			const beneficiaries = await axios
				.get(`${BASEURL}/acat/patient?limit=${limit}&offset=${offset}`)
				.catch(err => {
					if (err.response.status === 403 || err.response.status === 401) {
						// redirect to login
						window.location.href = '/'
					}
				})

			return beneficiaries.data
		} else {
			const beneficiaries = await axios.get(`${BASEURL}/acat/patient`)
			return beneficiaries.data
		}
	} catch (error) {
		return null
	}
}
