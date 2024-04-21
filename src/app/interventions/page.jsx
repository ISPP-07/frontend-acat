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
import RegisterInterventionModal from '../components/RegisterInterventionModal'
import Pagination from '@mui/material/Pagination'
import Select from 'react-select'
import { createAxiosInterceptors } from '../axiosConfig'

export default function InterventionPage() {
	const [data, setData] = useState(null)
	const [filteredData, setFilteredData] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [perPage, setPerPage] = useState(20)

	useEffect(() => {
		createAxiosInterceptors()
	}, [])

	const selectOpts = [
		{ label: '20', value: 20 },
		{ label: '40', value: 40 },
		{ label: '80', value: 80 }
	]

	const typologyOpts = [
		{ label: 'Prevención', value: 'Prevención' },
		{ label: 'Atención', value: 'Atención' },
		{
			label: 'Incorporación sociolaboral',
			value: 'Incorporación sociolaboral'
		},
		{ label: 'Otro', value: 'Otro' }
	]

	const handleTypologyChange = event => {
		const opt = event.target.value
		if (opt === '') {
			setFilteredData(data)
		} else {
			const filtered = data.filter(
				intervention => intervention.typology === opt
			)
			setFilteredData(filtered)
		}
	}

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
				const data1 = await fetchDataInterventions(
					perPage,
					(page - 1) * perPage
				)
				setTotalPages(Math.ceil(data1.total_elements / perPage))
				setData(data1.elements)
				let filteredIntervention = data1.elements
				if (startDate && endDate) {
					filteredIntervention = data.filter(intervention => {
						const expDate = new Date(intervention.date)
						return (
							expDate >= new Date(startDate) && expDate <= new Date(endDate)
						)
					})
				} else if (startDate && !endDate) {
					filteredIntervention = data.filter(intervention => {
						const expDate = new Date(intervention.date)
						return expDate >= new Date(startDate)
					})
				} else if (!startDate && endDate) {
					filteredIntervention = data.filter(intervention => {
						const expDate = new Date(intervention.date)
						return expDate <= new Date(endDate)
					})
				}
				setFilteredData(filteredIntervention)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [page, perPage, startDate, endDate])

	const handleSearch = searchTerm => {
		if (!searchTerm) {
			setData(data)
			setFilteredData(data)
		} else {
			const filtered = data.filter(
				intervention =>
					intervention.patient.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					intervention.typology.toString().includes(searchTerm.toLowerCase()) ||
					intervention.reason.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setFilteredData(filtered)
		}
	}

	const handlePageChange = (event, value) => {
		setPage(value)
	}
	const handleSelect = opt => {
		setPerPage(opt?.value)
	}

	return (
		<main className='flex w-full'>
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className='w-full h-full flex flex-col items-center'>
				<Searchbar
					handleClick={toggleModal}
					handleSearch={handleSearch}
					text='Registrar intervención'
					page='interventions'
					startDate={startDate}
					endDate={endDate}
					handleStartDateChange={e => setStartDate(e.target.value)}
					handleEndDateChange={e => setEndDate(e.target.value)}
					searchText='Buscar intervención por nombre, tipo o motivo'
					datosSelect={typologyOpts}
					handleSelectChange={handleTypologyChange}
				/>
				<div className='flex flex-row'>
					<button
						className=' bg-green-400 h-8 w-8 rounded-full shadow-2xl mt-3 mr-2'
						onClick={() => exportData(data, 'Intervenciones', { id: 'ID' })}
						data-testid='export-button'
					>
						<Image
							src='/excel.svg'
							className='ml-2'
							width={15}
							height={15}
							alt='excel'
						/>
					</button>
					<label
						htmlFor='file'
						className='bg-green-400 w-32 h-6 mt-4 rounded-full font-Varela text-white cursor-pointer text-center text-sm'
					>
						Importar datos
					</label>
					<input
						type='file'
						id='file'
						onChange={handleFileChange}
						style={{ display: 'none' }}
						accept='.xls'
						data-testid='file'
					/>
				</div>
				<div className='container p-10 flex flex-wrap gap-5 justify-center items-center'>
					<Suspense fallback={<div>Cargando...</div>}>
						{filteredData &&
							filteredData.map(intervention => (
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
						className='flex flex-wrap justify-center items-center'
					/>
					<div className='flex justify-center items-center m-2'>
						<p>Número de elementos:</p>
						<Select
							options={selectOpts}
							defaultValue={{ label: '20', value: 20 }}
							isSearchable={false}
							isClearable={false}
							onChange={handleSelect}
							className='m-2'
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
