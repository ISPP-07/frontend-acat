'use client'
import CreateUserForm from '../components/CreateUserForm'
import Sidebar from '../components/sidebar'
/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */

export default function Home() {
	const [closeLoader] = useState(false)

	useEffect(() => {
		const loader = document.getElementById('loader')
		loader.classList.add('hidden')
	}, [closeLoader])

	// Check the user is a master user
	useEffect(() => {
		const token = localStorage.getItem('jwt')
		if (!token) {
			window.location.href = '/'
		}
	}, [])

	return (
		<main className="flex bg-white wallpaper w-screen h-screen text-black">
			<Suspense fallback={<div></div>}>
				<Sidebar className="relative" />
			</Suspense>
			<div className="w-full h-full flex items-center justify-center">
				<CreateUserForm />
			</div>
		</main>
	)
}
