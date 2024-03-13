import axios from 'axios'
export async function fetchDataInterventions() {

	try{
		const interventions = await axios.get(
			'https://65df8753ff5e305f32a26916.mockapi.io/Interventions/interventions'
		)
		return interventions.data
	}
	catch (error) {
		return null
	}
}