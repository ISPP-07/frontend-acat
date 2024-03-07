'use client'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import Card from './card.jsx'
import { fetchDataBeneficiaries } from './fetch.js'
import Image from 'next/image.js'
import exportData from '../exportData.js'

export default async function BeneficiariesList() {
	const data = await fetchDataBeneficiaries()
	return (
		<div className='max-w-fit'>
			<div className="h-12 w-12 top-28 absolute" >
						<button className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2" onClick={()=>exportData(data,'Beneficiados')}>
							<Image
								src="/excel.svg"
								className="ml-2"
								width={15}
								height={15}>	
							</Image>
						</button>
					</div>
		<div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
			{data.map(beneficiary => (
				<Link href={`/beneficiaries/${beneficiary.id}`} key={beneficiary.id}>
					<Card key={beneficiary.id} beneficiary={beneficiary} />
				</Link>
			))}
		</div>
		</div>
	)
}
