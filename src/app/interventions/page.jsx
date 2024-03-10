'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import CardIntervention from '../components/cardIntervention'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import Link from 'next/link'
import { fetchDataInterventions } from './fetchIntervention'
import Image from 'next/image'
import exportData from '../exportData'
import axios from 'axios'

export default async function InterventionPage() {
	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => {
		setShowModal(!showModal)
	}

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
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} text="Registrar intervención" />
				<div className="flex flex-row">
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
						className="bg-green-400 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm"
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
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(intervention => (
						<Link
							href={`/interventions/${intervention.id}`}
							key={intervention.id}
						>
							<CardIntervention
								key={intervention.id}
								intervention={intervention}
								handleClick={toggleModal}
							/>
						</Link>
					))}
				</div>
			</div>
		</main>
	)
}
