import './globals.css'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export const metadata = {
	title: 'ACAT',
	description: 'Asociación Ciudadana de Ayuda al Toxicómano',
	manifest: '/manifest.json'
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body>{children}</body>
		</html>
	)
}
