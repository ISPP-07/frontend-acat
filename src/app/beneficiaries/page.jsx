'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useEffect } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import CardBeneficiary from '../components/cardBeneficiary.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import { fetchDataBeneficiaries } from './fetch.js'
import Image from 'next/image'
import exportData from '../exportData.js'
import axios from 'axios'
import CreateModal from './create.jsx'

export default function BeneficiariesList() {
	const [data, setData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const toggleModal = () => {
		setShowModal(!showModal)
	}

	const isMobile = () => {
		return typeof window !== 'undefined' ? window.innerWidth <= 768 : false
	}
	const mobile = isMobile() ? 'false' : 'true'

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
				const data = await fetchDataBeneficiaries()
				setData(data)
			} catch (error) {
				console.error('Error al cargar los datos:', error)
				alert(
					'Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo.'
				)
			}
		}
		fetchData()
	}, [])

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />
				<div className="flex flex-row">
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
							alt="Exportar a excel"
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
						data-testid="file"
					/>
				</div>
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					<Suspense fallback={<div>Cargando...</div>}>
						{data &&
							data.map(beneficiary => (
								<Link
									href={`/beneficiaries/${beneficiary.id}?showSidebar=${mobile}`}
									key={beneficiary.id}
								>
									<CardBeneficiary
										key={beneficiary.id}
										beneficiary={beneficiary}
									/>
								</Link>
							))}
					</Suspense>
				</div>
			</div>
			{showModal ? <CreateModal closeModal={toggleModal} /> : null}
		</main>
	)
}
