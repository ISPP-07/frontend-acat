import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react'
import CreateModal from './create'
/* eslint-enable no-unused-vars */

export default function Layout({ children }) {
	return (
		<main className="flex min-w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar Modal={CreateModal} />
				{children}
			</div>
		</main>
	)
}
