import './globals.css'
import React from 'react'
export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<body className="p-0 m-0">{children}</body>
		</html>
	)
}
