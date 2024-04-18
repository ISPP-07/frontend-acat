'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import Image from 'next/image'
import LoginForm from './components/LoginForm'
import UpdatePasswordForm from './components/UpdatePasswordForm'
export default function Home() {
	const [forgotPassword, setForgotPassword] = useState(false)

	const toggleForgotPassword = () => {
		setForgotPassword(!forgotPassword)
	}

	const handleDonationClick = () => {
		const URL = process.env.NEXT_PUBLIC_STRIPE_BASE_URL
		window.location.href = URL
	}

	return (
		<main className="flex flex-col lg:flex-row items-center justify-around w-screen h-screen text-black">
			<Image
				alt="ACAT Background"
				src="/acatbackground.png"
				fill="true"
				style={{
					objectFit: 'fill',
					position: 'absolute',
					zIndex: -10
				}}
				quality={100}
			/>

			<Image src="/acatlogo.png" alt="ACAT Logo" width={600} height={800} />

			<div className="flex flex-col items-center">
				{forgotPassword ? (
					<UpdatePasswordForm onToggle={() => toggleForgotPassword(false)} />
				) : (
					<LoginForm onToggle={() => toggleForgotPassword(true)} />
				)}
				<button
					onClick={handleDonationClick}
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col items-center"
				>
					Donar €
				</button>
			</div>
		</main>
	)
}
