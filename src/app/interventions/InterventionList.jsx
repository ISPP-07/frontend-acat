'use client'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
import InterventionCard from './InterventionCard'
import Link from 'next/link.js'
import { fetchDataInterventions } from './fetch.jsx'
import Image from 'next/image'
import exportData from '../exportData'
import axios from 'axios'

export default async function InterventionList() {
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
	const data = await fetchDataInterventions()
	return (
		<div className="max-w-fit">
			<div className="h-12 w-max top-28 absolute flex flex-row">
				<button
					className=" bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2"
					onClick={() => exportData(data, 'Intervenciones')}
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 overflow-y-scroll relative top-28">
				{data.map(intervention => (
					<Link href={'interventions'} key={intervention.id}>
						<InterventionCard
							key={intervention.id}
							intervention={intervention}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}
