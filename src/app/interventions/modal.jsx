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

	const handleEditClick = () => {
		console.log('Clic en el icono de edición')
	}

	const handleTrashClick = () => {
		console.log('Clic en el icono de eliminación')
	}

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isVisible ? 'z-30' : 'z-0'} `}
			id="close"
			onClick={toClose}
		>
			<div className="w-[400px] h-[400px] ">
				<div className="bg-white p-5 rounded-3xl text-black font-Varela">
					<div className="flex w-full justify-end">
						<button
							className="bg-red-500 text-black text-2xl rounded-md shadow-lg w-1/6 h-full mb-3"
							onClick={onClose}
						>
							X
						</button>
					</div>
					<div className="flex items-center">
						<h1 className="mb-3 text-left text-4xl">
							<strong>Datos de la intervención</strong>
						</h1>
						<Image
							src="/calendar.svg"
							width={120}
							height={18}
							className="ml-2"
							alt="Icono de calendario"
						></Image>
					</div>
					<div className="mb-1 flex">
						<Image
							src="/edit.svg"
							width={30}
							height={18}
							className="mr-2 cursor-pointer"
							onClick={handleEditClick}
							alt="Icono de edición"
						/>
						<Image
							src="/trash.svg"
							width={30}
							height={18}
							className="mr-2 cursor-pointer"
							onClick={handleTrashClick}
							alt="Icono de eliminación"
						/>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Beneficiario:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.name}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Fecha de atención:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.fecha}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Tipología:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.tipología}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Técnico:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.técnico}</strong>
						</p>
					</div>
					<div className="mb-1 flex items-center">
						<p className="text-blue-500 inline mr-2">
							<strong>Motivo:</strong>
						</p>
						<p className="inline">
							<strong>{selectedIntervention.motivo}</strong>
						</p>
					</div>
					<p className="text-blue-500">
						<strong>Observaciones:</strong>
					</p>
					<p>
						<strong>-{selectedIntervention.observaciones}</strong>
					</p>
				</div>
			</div>
		</div>
	)
}
