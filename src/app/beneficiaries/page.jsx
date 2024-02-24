import Card from './card.jsx'
import { fetchDataBeneficiaries } from './fetch.js'

export default async function BeneficiariesList() {
	const data = await fetchDataBeneficiaries()
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.map(beneficiary => (
				<Card key={beneficiary.id} beneficiary={beneficiary} />
			))}
		</div>
	)
}
