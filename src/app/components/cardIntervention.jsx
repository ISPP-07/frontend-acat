/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardIntervention({ intervention, handleClick }) {
	const dateIntervention = new Date(intervention.intervention_date)
		.toLocaleString()
		.split(',')[0]

	const hourIntervention = new Date(intervention.intervention_date)
		.toLocaleTimeString('es-ES', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit'
		})
		.slice(0, 5)

	console.log(hourIntervention)
	return (
		<div
			className="flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[300px] rounded-xl hover:scale-105 hover:cursor-pointer"
			onClick={handleClick}
		>
			<div className="mr-3">
				<img src="/calendar.svg" width={100} alt="calendar" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{intervention.patient}</strong>
				<div className={'flex justify-end gap-2 mt-2'}>
					{/* Add tags with following format */}
					{intervention.intervention_date && (
						<>
							<Tag
								pathsvg={'/calendar.svg'}
								color={'bg-orange-50'}
								textColor={'text-orange-400'}
								text={dateIntervention}
							/>
							<Tag
								pathsvg={'/clock.svg'}
								color={'bg-green-100'}
								textColor={'text-green-700'}
								text={hourIntervention}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
