import InterventionCard from './InterventionCard'

const InterventionList = ({ interventions }) => {
	return (
		<div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{interventions.map(intervention => (
				<div key={intervention.id} className="w-full">
					<InterventionCard key={intervention.id} intervention={intervention} />
				</div>
			))}
		</div>
	)
}

export default InterventionList
