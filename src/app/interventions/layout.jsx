'use client'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import RegisterInterventionModal from './RegisterInterventionModal'
/* eslint-enable no-unused-vars */

export default function Layout({ children }) {
	return (
		<main className="absolute bg-white w-full h-full ">
			<div className="flex h-full flex-col md:flex-row overflow-x-hidden ">
				<div className="w-full h-full flex-none md:w-64 fixed z-10">
					<Sidebar />
				</div>
				<div className="left-80 relative w-full overflow-x-hidden">
					<div className="-ml-56 min-h-24 w-full fixed z-30">
						<Searchbar Modal={RegisterInterventionModal} />
					</div>
					<main className="p-6 md:p-12">{children}</main>
				</div>
			</div>
		</main>
	)
}
