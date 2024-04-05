'use client'
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'

export default function Modal({ isVisible, onClose, selectedIntervention }) {
	if (!isVisible) return null
	useEffect(() => {
		const disableTabNavigation = x => {
			if (isVisible) {
				x.preventDefault()
			}
		}

		document.addEventListener('keydown', disableTabNavigation)

		return () => {
			document.removeEventListener('keydown', disableTabNavigation)
		}
	}, [isVisible, onClose])

	const toClose = x => {
		if (x.target.id === 'close') {
			onClose()
		}
	}

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isVisible ? 'z-30' : 'z-0'} `}
			id="close"
			onClick={toClose}
			data-testid="close"
		>
			<div className="w-[400px] h-[400px] " data-testid="modal">
				<div className="bg-white p-5 rounded-3xl text-black font-Varela">
					<div className="flex items-center w-full">
						<h1 className="mb-3 text-left text-4xl max-w-56">
							<strong>Datos de la intervención</strong>
						</h1>
						<div className="flex flex-col w-full">
							<div className="flex justify-end">
								<button
									className="bg-red-500 text-white text-xl rounded-md shadow-lg w-1/3 h-full mb-3"
									onClick={onClose}
								>
									X
								</button>
							</div>
							<Image
								src="/calendar.svg"
								width={66}
								height={66}
								className="ml-6"
								alt="Icono de calendario"
							/>
						</div>
					</div>
					<div className="mb-1 flex">
						<Image
							src="/edit.svg"
							width={30}
							height={18}
							className="mr-2 cursor-pointer"
							alt="Icono de edición"
						/>
						<Image
							src="/trash.svg"
							width={30}
							height={18}
							className="mr-2 cursor-pointer"
							alt="Icono de eliminación"
						/>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Beneficiario:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.patient}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Fecha de atención:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.intervention_date}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Tipología:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.technician}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Técnico:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.technician}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Motivo:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.technician}</strong>
						</p>
					</div>
					<p className="text-blue-500">
						<strong>Observaciones:</strong>
					</p>
					<p>
						<strong>-{selectedIntervention.technician}</strong>
					</p>
				</div>
			</div>
		</div>
	)
}
