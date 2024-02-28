import InterventionList from './InterventionList'

const interventions = [
	{ id: 1, user: 'Pérez Jiménez', date: '22/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 1, user: 'Pérez Jiménez', date: '22/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 1, user: 'Pérez Jiménez', date: '22/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 1, user: 'Pérez Jiménez', date: '22/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' },
	{ id: 2, user: 'Sánchez López', date: '12/2/2024' }
	// Agrega más appointments según sea necesario
]

function AppointmentsPage() {
	return <InterventionList interventions={interventions} />
}

export default AppointmentsPage
