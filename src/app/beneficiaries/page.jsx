'use client'
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import React from 'react'
/* eslint-enable no-unused-vars */
import CreateModal from './create'

export default function Page() {
	const [verModal, setVerModal] = useState(false)

	return (
		<main className="wallpaper">
			<CreateModal isVisible={verModal} onClose={() => setVerModal(false)} />
			<button
				className={`bg-cyan-500 rounded-full ${verModal ? 'blur' : ''}`}
				onClick={() => setVerModal(true)}
			>
				{' '}
				Dar de alta
			</button>
		</main>
	)
}
