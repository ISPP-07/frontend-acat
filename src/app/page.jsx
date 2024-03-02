import Image from 'next/image'
import LoginForm from './components/LoginForm'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
export default function Home() {
	return (
		<main className="flex flex-row items-center justify-around w-screen h-screen">
			<Image
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

			<LoginForm />
		</main>
	)
}
