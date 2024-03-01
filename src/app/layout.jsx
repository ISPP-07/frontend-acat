import './globals.css'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body className="p-0 m-0">{children}</body>
		</html>
	)
}
