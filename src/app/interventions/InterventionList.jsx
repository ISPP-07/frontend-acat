'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import InterventionCard from './InterventionCard'
import Link from 'next/link.js'
import { fetchDataInterventions } from './fetch.jsx'
import Image from 'next/image'
import exportData from '../exportData'

export default async function InterventionList() {
	const data = await fetchDataInterventions()
	return (
		<div className='max-w-fit'>
			<div className="h-12 w-12 top-28 absolute" >
						<button className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2" onClick={()=>exportData(data,'Intervenciones')}>
							<Image
								src="/excel.svg"
								className="ml-2"
								width={15}
								height={15}>	
							</Image>
						</button>
					</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
				{data.map(intervention => (
					<Link href={'interventions'} key={intervention.id}>
						<InterventionCard key={intervention.id} intervention={intervention} />
					</Link>
				))}
			</div>
		</div>
	)
}
