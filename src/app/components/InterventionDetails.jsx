'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
import Image from 'next/image'
import ButtonIcon from './buttonIcon'
/* eslint-enable no-unused-vars */

export default function InterventionDetails() {
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
			<div className="flex flex-col gap-3">
				<p className="font-Varela text-gray-800">
					<span className="font-Varela text-blue-500 font-bold mr-2">
						Fecha de atención:
					</span>
					01/01/2000
				</p>
				<p className="font-Varela text-gray-800">
					<span className="font-Varela text-blue-500 font-bold mr-2">
						Tipología:
					</span>
					Dermatologo
				</p>
				<p className="font-Varela text-gray-800">
					<span className="font-Varela text-blue-500 font-bold mr-2">
						Técnico:
					</span>
					Manuel García
				</p>
				<p className="font-Varela text-gray-800">
					<span className="font-Varela text-blue-500 font-bold mr-2">
						Motivo:
					</span>
					Caida del tercer piso
				</p>
				<p className="font-Varela text-gray-800">
					<p className="font-Varela text-blue-500 font-bold mr-2">
						Observaciones:
					</p>
					- Presenta fractura en la pierna derecha.
				</p>
			</div>
		</div>
	)
}
