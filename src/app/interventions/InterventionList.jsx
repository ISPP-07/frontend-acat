import InterventionCard from './InterventionCard'

const InterventionList = ({ interventions }) => {
	return (
		<div className="max-w-fit bg-white p-4 rounded-lg shadow">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 overflow-y-scroll relative top-28">
				{interventions.map(intervention => (
					<InterventionCard key={intervention.id} intervention={intervention} />
				))}
			</div>
		</div>
	)
}

export default InterventionList
