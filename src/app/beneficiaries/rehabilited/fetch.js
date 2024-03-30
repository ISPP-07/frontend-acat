import axios from 'axios'
export async function Rehabilited() {
	const BASEURL = process.env.NEXT_PUBLIC_BASE_URL
	try{
		const beneficiaries = await axios.get(
			`${BASEURL}/acat/patient/`)
		return beneficiaries.data.filter(
            patient => patient.is_rehabilitated === true
        )
	}
    catch (error) {
		return null
	}
}
