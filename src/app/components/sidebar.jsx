'use client'
import Image from 'next/image'
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
/* eslint-enable no-unused-vars */
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import SidebarEntry from './sidebarEntry'

export default function Sidebar() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	// Check if user is MASTER
	useEffect(() => {
		const jwt = localStorage.getItem('jwt')
		if (!jwt) {
			window.location.href = '/'
		}
	}, [])

	const isMobile = () => {
		return typeof window !== 'undefined' ? window.innerWidth <= 768 : false
	}

	const initialState = isMobile() ? 'false' : 'true'

	const links = [
		{
			link: `/beneficiaries?showSidebar=${initialState}`,
			icon: '/family.svg',
			text: 'Beneficiarios'
		},
		{
			link: `/beneficiaries/rehabilited?showSidebar=${initialState}`,
			icon: '/bye.svg',
			text: 'Finalizados',
			subentry: true
		},
		{
			link: `/interventions?showSidebar=${initialState}`,
			icon: '/calendar.svg',
			text: 'Intervenciones'
		},
		{
			link: `/passwords?showSidebar=${initialState}`,
			icon: '/password.svg',
			text: 'Cambiar contraseña'
		},
		{
			link: `/users?showSidebar=${initialState}`,
			icon: '/face.svg',
			text: 'Usuarios'
		},
		{
			link: `/create-user?showSidebar=${initialState}`,
			icon: '/face-plus.svg',
			text: 'Crear nuevo usuario',
			subentry: true
		}
	]

	const state = searchParams?.get('showSidebar') === 'true'

	const toggleShowSidebar = () => {
		const params = new URLSearchParams(searchParams)
		params.set('showSidebar', (!state).toString())
		replace(`${pathname}?${params.toString()}`)
	}

	return (
		<div
			className={`${state ? 'min-w-[300px] w-[300px] max-w-[300px] fixed sm:sticky' : 'max-w-0 min-w-0 w-0 sm:min-w-[30px] sm:w-[30px] sm:max-w-[30px] sticky'} top-0 left-0 border border-solid h-screen shadow-xl z-20 bg-white transition-all duration-50`}
		>
			<button
				className={`${state ? 'left-[280px]' : 'left-[10px]'} absolute cursor-pointer border-2 rounded-full border-white w-[40px] h-[40px] top-5 bg-blue-400 hover:bg-blue-600 flex items-center justify-center transition-all duration-50`}
				onClick={toggleShowSidebar}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-3/4 h-3/4 text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d={`${state ? 'M15.75 19.5 8.25 12l7.5-7.5' : 'm8.25 4.5 7.5 7.5-7.5 7.5'}`}
					/>
				</svg>
			</button>
			<Image
				src="/acat.jpg"
				width={300}
				height={100}
				className={`${state ? '' : 'hidden'}`}
				alt="Logo de ACAT"
			/>
			<div className="flex flex-col justify-between">
				<div className={`${state ? '' : 'hidden'} flex flex-col my-3`}>
					{links.map((link, index) => (
						<SidebarEntry
							key={index}
							link={link.link}
							icon={link.icon}
							text={link.text}
							subentry={link.subentry}
							pathname={pathname}
						/>
					))}
				</div>
				<div
					className={`${state ? '' : 'hidden'} absolute bottom-0 w-[300px] left-[30px]`}
				>
					<hr className="w-4/5"></hr>
					<div
						onClick={() => {
							localStorage.removeItem('jwt')
							localStorage.removeItem('refresh')
							window.location.href = '/'
						}}
						className="flex items-center justify-center text-sm font-normal font-Varela text-white rounded-xl bg-red-500 hover:bg-red-700 shadow-xl p-2 w-3/4 my-9 gap-2 cursor-pointer"
					>
						<Image src="/logout.svg" width={18} height={18}></Image>
						<span>Cerrar Sesión</span>
					</div>
				</div>
			</div>
		</div>
	)
}
