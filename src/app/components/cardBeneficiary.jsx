/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Tag from './tag'

export default function CardBeneficiary({ beneficiary }) {
	return (
		<div className="flex border-[1px] border-solid border-gray-100 shadow-lg p-4 w-full min-w-[300px] max-w-[300px] rounded-xl hover:scale-105 hover:cursor-pointer transition duration-100">
			<div className="mr-3">
				<img src="/family.svg" width={100} alt="family" />
			</div>
			<div className="flex flex-col justify-between w-full">
				<strong className="text-xl">{beneficiary.alias}</strong>
				<div className={'flex justify-end gap-2 mt-2'}>
					{/* Add tags with following format */}
					{beneficiary.interventions ? (
						<Tag
							pathsvg={'/calendar.svg'}
							color={'bg-green-100'}
							textColor={'text-green-700'}
							text={beneficiary.interventions.length}
						/>
					) : null}
					{beneficiary.age && (
						<Tag
							pathsvg={'/face.svg'}
							color={'bg-gray-100'}
							textColor={'text-gray-700'}
							text={beneficiary.age}
						/>
					)}
					{beneficiary.isFinished && (
						<Tag pathsvg={'/check.svg'} color={'bg-blue-100'} isOnlyIcon />
					)}
				</div>
			</div>
		</div>
	)
}
