'use client'
import CreateUserForm from '../components/CreateUserForm'
import Sidebar from '../components/sidebar'
/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense } from 'react'
import axios from 'axios'
import { createAxiosInterceptors } from '../axiosConfig'
/* eslint-enable no-unused-vars */

export default function Home() {
	// Check the user is a master user
	useEffect(() => {
		const isMaster = async () => {
			const token = localStorage.getItem('jwt')
			if (!token) {
				window.location.href = '/'
			}
			createAxiosInterceptors()
			const res = await axios
				.get(process.env.NEXT_PUBLIC_BASE_URL + '/shared/auth/master')
				.catch(_ => {
					window.location.href = '/'
				})
			if (!res.data.is_master) {
				window.location.href = '/'
			}
		}
		isMaster()
	}, [])
	return (
		<main className='flex bg-white wallpaper w-screen h-screen text-black'>
			<Suspense fallback={<div></div>}>
				<Sidebar className='relative' />
			</Suspense>
			<div className='w-full h-full flex items-center justify-center'>
				<CreateUserForm />
			</div>
		</main>
	)
}
