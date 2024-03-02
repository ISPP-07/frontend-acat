'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Modal from './components/modal'
import Searchbar from './components/searchbar'
import Sidebar from './components/sidebar'

export default function Home() {
	const [verModal, setVerModal] = useState(false)

	return (
		<main className="absolute bg-white w-full h-full ">
			<Sidebar />
			<Searchbar />
			<Modal isVisible={verModal} onClose={() => setVerModal(false)} />
			<button
				className={`bg-cyan-500 rounded-full top-3/4 left-1/4 w-28 absolute ${verModal ? 'blur' : ''}`}
				onClick={() => setVerModal(true)}
			>
				Probar modal
			</button>
		</main>
	)
}