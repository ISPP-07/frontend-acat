import axios from 'axios'
export function fetchDataIntervention(interventionId) {
	const intervention = axios.get(
		'https://65df8753ff5e305f32a26916.mockapi.io/Interventions/interventions' +
			interventionId
	)
	return intervention.then(response => {
		return response.data
	})
}
