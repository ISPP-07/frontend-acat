'use client'

/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import Card from './card.jsx'
import { fetchDataBeneficiaries } from './fetch.js'
import Image from 'next/image.js'
import exportData from '../exportData.js'
import axios from 'axios'

export default async function BeneficiariesList() {
	const data = await fetchDataBeneficiaries()
	const handleFileChange = async event => {
		const selectedFile = event.target.files[0]
		try {
			const formData = new FormData()
			formData.append('file', selectedFile)
			await axios.post('url/de/import', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			alert('Datos importados correctamente')
		} catch (error) {
			console.error(error)
			alert('Error al importar los datos')
		}
	}
	return (
		<div className="max-w-fit">
			<div className="h-12 w-max top-28 absolute flex flex-row">
				<button
					className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
					onClick={() =>
						exportData(data, 'Beneficiados', [
							'id',
							'alias',
							'birthday',
							'isFinished'
						])
					}
					data-testid="export-button"
				>
					<Image
						src="/excel.svg"
						className="ml-2"
						width={15}
						height={15}
					></Image>
				</button>
				<label
					htmlFor="file"
					className="bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm"
				>
					Importar datos
				</label>
				<input
					type="file"
					id="file"
					onChange={handleFileChange}
					style={{ display: 'none' }}
					accept=".xls"
				/>
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
