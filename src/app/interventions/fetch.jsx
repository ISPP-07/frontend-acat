import axios from 'axios'

export function fetchDataInterventions() {
	const interventions = axios.get(
		'https://65df8753ff5e305f32a26916.mockapi.io/Interventions/interventions'
	)
	return interventions.then(response => {
		console.log(response.data) // Mostrar los datos en la consola
		return response.data
	})
}
