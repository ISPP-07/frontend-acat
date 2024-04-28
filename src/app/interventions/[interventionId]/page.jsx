'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import InterventionDetails from '../../components/InterventionDetails'
import Sidebar from '../../components/sidebar'
import { fetchDataIntervention } from './fetch'
import { createAxiosInterceptors } from '../../axiosConfig'

export default function Page({ params }) {
	const [intervention, setIntervention] = useState(null)
	const [closeLoader] = useState(false)

	useEffect(() => {
		const loader = document.getElementById('loader')
		loader.classList.add('hidden')
	}, [closeLoader])

	useEffect(() => {
		createAxiosInterceptors()
		const fetchData = async () => {
			try {
				const intervention = await fetchDataIntervention(params.interventionId)
				setIntervention(intervention)
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
		<main className="flex bg-white wallpaper w-screen h-screen text-black">
			<Suspense fallback={<div></div>}>
				<Sidebar className="relative" />
			</Suspense>
			<div className="w-full h-full flex items-center justify-center">
				<InterventionDetails intervention={intervention} />
			</div>
		</main>
	)
}
