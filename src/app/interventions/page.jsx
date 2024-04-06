'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import CardIntervention from '../components/cardIntervention'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import Link from 'next/link'
import { fetchDataInterventions } from './fetchIntervention'
import Image from 'next/image'
import { exportData } from '../exportData'
import axios from 'axios'
import RegisterInterventionModal from './RegisterInterventionModal'
import Pagination from '@mui/material/Pagination'
import Select from 'react-select'

export default function InterventionPage() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(25)

	const selectOpts = [
		{ label: '25', value: 25 },
		{ label: '50', value: 50 },
		{ label: '100', value: 100 }
	]
	// change when backend retrieval is updated
	const totalPages = Math.ceil(data?.total_elements / perPage)

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchDataInterventions(perPage, (page - 1) * perPage)
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [page, perPage])

	const handlePageChange = (event, value) => {
		setPage(value)
	}
	const handleSelect = opt => {
		setPerPage(opt?.value)
	}

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
						onClick={() => exportData(data, 'Intervenciones', { id: 'ID' })}
						data-testid="export-button"
					>
						<Image
							src="/excel.svg"
							className="ml-2"
							width={15}
							height={15}
							alt="excel"
						/>
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
						data-testid="file"
					/>
				</div>
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{data &&
							data.elements.map(intervention => (
								<Link
									href={`/interventions/${intervention.id}`}
									key={intervention.id}
								>
									<CardIntervention
										key={intervention.id}
										intervention={intervention}
									/>
								</Link>
							))}
					</Suspense>
				</div>
				<div>
					<Pagination
						count={totalPages}
						initialpage={1}
						onChange={handlePageChange}
						className="flex flex-wrap justify-center items-center"
					/>
					<div className="flex justify-center items-center m-2">
						<p>Número de elementos:</p>
						<Select
							options={selectOpts}
							defaultValue={{ label: '25', value: 25 }}
							isSearchable={false}
							isClearable={false}
							onChange={handleSelect}
							className="m-2"
						/>
					</div>
				</div>
			</div>
			{showModal ? (
				<RegisterInterventionModal onClickFunction={toggleModal} />
			) : null}
		</main>
	)
}
