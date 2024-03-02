'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Modal from './modal'
function InterventionCard({ intervention }) {
	const [selectedIntervention, setSelectedIntervention] = useState(null)
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const openModal = intervention => {
		setSelectedIntervention(intervention)
		setModalIsOpen(true)
	}

	return (
		<>
			<div
				className="mt-6 flex justify-center transition-transform transform hover:scale-105  hover:cursor-pointer"
				onClick={() => openModal(intervention)}
				data-testid="intervention-card"
			>
				<div className="relative flex w-full p-4 max-w-[32rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
					<div className="w-24">
						<img
							src="/calendar.svg"
							alt="calendar"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="flex flex-col w-full p-4">
						<div className="flex flex-col items-start justify-between w-full h-full">
							<div>
								<h3 className="text-xl font-bold">{intervention.patient}</h3>
							</div>
							<div className="flex flex-col items-start w-full">
								<div className="flex flex-row items-center justify-center w-full gap-5">
									<Tags
										svg={<img src="/calendar.svg" alt="calendar" />}
										text={intervention.intervention_date}
										color={'text-[#117b34] bg-[#EEFDF3]'}
									/>
									{/* Agregar más tags según sea necesario */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isVisible={modalIsOpen}
				onClose={() => setModalIsOpen(false)}
				selectedIntervention={selectedIntervention}
				data-testid="intervention-modal"
			/>
		</>
	)
}

export default InterventionCard

function Tags({ svg, text, color }) {
	return (
		<div
			className={
				'text-xs inline-flex gap-2 items-center leading-sm px-3 py-1 rounded-full ' +
				color
			}
		>
			<span>{svg}</span>
			<span>{text}</span>
		</div>
	)
}
