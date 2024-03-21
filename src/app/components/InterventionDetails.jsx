'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import ButtonIcon from './buttonIcon'

export default function InterventionDetails({ intervention }) {
	return (
		<div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-10 drop-shadow-lg border border-gray-300">
			<div className="flex gap-3 justify-end w-full">
				<ButtonIcon
					iconpath="/edit.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-blue-500'}
				/>
				<ButtonIcon
					iconpath="/trash.svg"
					iconWidth={20}
					iconHeight={20}
					color={'bg-red-500'}
				/>
			</div>
			<div className="flex gap-2 items-center justify-center">
				<Image
					src="/calendar.svg"
					width={40}
					height={40}
					alt="Icono de calendario"
				/>
				<h1 className="text-center font-poppins text-2xl">
					<strong>Datos de la intervención</strong>
				</h1>
			</div>
			<hr></hr>
			{intervention && (
				<div className="flex flex-col gap-3">
					<p className="font-Varela text-gray-800">
						<span className="font-Varela text-blue-500 font-bold mr-2">
							Fecha de atención:
						</span>
						{intervention.date}
					</p>
					<p className="font-Varela text-gray-800">
						<span className="font-Varela text-blue-500 font-bold mr-2">
							Tipología:
						</span>
						{intervention.typology}
					</p>
					<p className="font-Varela text-gray-800">
						<span className="font-Varela text-blue-500 font-bold mr-2">
							Técnico:
						</span>
						{intervention.technician}
					</p>
					<p className="font-Varela text-gray-800">
						<span className="font-Varela text-blue-500 font-bold mr-2">
							Motivo:
						</span>
						{intervention.reason}
					</p>
					<div className="font-Varela text-gray-800">
						<span className="font-Varela text-blue-500 font-bold mr-2">
							Observaciones:
						</span>
						<textarea
							className="resize-none w-full h-40 overflow-y-auto border border-gray-400 rounded-md p-2"
							readOnly
							value={intervention.observations}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
