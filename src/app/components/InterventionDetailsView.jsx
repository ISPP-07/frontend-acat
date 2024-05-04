/* eslint-disable no-unused-vars */
import React from 'react'
import { formatDate } from '../utils'
/* eslint-enable no-unused-vars */

export default function InterventionDetailsView({ intervention }) {
	return (
		<section className='flex flex-col gap-3 w-full'>
			<article className='flex items-center w-full'>
				<p className='font-Varela w-fit text-blue-500 font-bold mr-2'>
					Paciente:
				</p>
				<p className='p-1 w-full'>
					{intervention.patient.alias
						? intervention.patient.alias
						: intervention.patient.name}
				</p>
			</article>
			<article className='flex items-center w-full'>
				<p className='font-Varela text-blue-500 font-bold mr-2'>
					Fecha de atención:
				</p>
				<p className='p-1'>{formatDate(intervention.date)}</p>
			</article>
			<article className='flex items-center w-full'>
				<p className='font-Varela text-blue-500 font-bold mr-2'>Tipología:</p>
				<p className='p-1'>{intervention.typology}</p>
			</article>
			<article className='flex items-center w-full'>
				<p className='font-Varela text-blue-500 font-bold mr-2'>Técnico:</p>
				<p className='p-1'>{intervention.technician}</p>
			</article>
			<article className='flex items-center w-full'>
				<p className='font-Varela text-blue-500 font-bold mr-2'>Motivo</p>
				<p className='p-1'>{intervention.reason || '--'}</p>
			</article>
			<article className='flex flex-col w-full'>
				<p className='font-Varela text-blue-500 font-bold mr-2'>
					Observaciones:
				</p>
				<p className='p-1'>{intervention.observations || '--'}</p>
			</article>
		</section>
	)
}
