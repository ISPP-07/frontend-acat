'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import Link from 'next/link.js'
import CardBeneficiary from '../components/cardBeneficiary.jsx'
import Sidebar from '../components/sidebar.jsx'
import Searchbar from '../components/searchbar.jsx'
import CreateModal from '../beneficiaries/create.jsx'

export default function BeneficiariesList() {
	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => {
		setShowModal(!showModal)
	}
	const data = [
		{
			alias: 'Delia Maggio',
			interventions: [
				34765,
				22272,
				41158,
				',xWc}2ZbTL',
				73922,
				'}hlk&dQ{vp',
				'?IW{S.a/-\\',
				11775,
				72607,
				'-W9o_}F{eQ'
			],
			birthday: '1996-01-28T16:53:16.087Z',
			isFinished: true,
			id: '1'
		},
		{
			alias: 'Denise Ledner',
			interventions: [
				30629,
				72559,
				'iTzc`2\'HX"',
				'::T;8WK{]B',
				31302,
				"l7$?+E'&Cd",
				'<m0KUo;4>:',
				89980,
				45442,
				'qMVMKNwj#G'
			],
			birthday: '1996-11-23T03:09:43.698Z',
			isFinished: false,
			id: '2'
		},
		{
			alias: 'Peter Runolfsson',
			interventions: [
				52076,
				30583,
				'W)fXupWSv}',
				'dQyX!`T-`[',
				't|.hQ.#XLq',
				"K0cY!'I,Yl",
				'{p[Z)a@6(h',
				60501,
				96530,
				63139
			],
			birthday: '1991-06-15T17:03:10.244Z',
			isFinished: false,
			id: '3'
		},
		{
			alias: 'Dexter Heathcote',
			interventions: [
				14634,
				8034,
				69089,
				53024,
				62320,
				'm%,sF>7}:{',
				62517,
				74046,
				'^5CO*{[!!B',
				42424
			],
			birthday: '1977-09-23T12:10:00.593Z',
			isFinished: false,
			id: '4'
		},
		{
			alias: 'Dexter Moore',
			interventions: [
				'[N8r?rRHDW',
				25831,
				64097,
				':s}k,18L4i',
				31906,
				'din,3@o:W"',
				25421,
				'CXkl<F)UjB',
				"B'a4_'OzjY",
				'/*eOX]f,MP'
			],
			birthday: '1976-09-29T17:01:36.302Z',
			isFinished: true,
			id: '5'
		},
		{
			alias: 'Brent Jakubowski V',
			interventions: [
				22104,
				'&IuAl?V3-Y',
				"OS'c7/6z<.",
				'tO*%iZ*2\\=',
				50030,
				'(EDm%@m^Z>',
				79714,
				'"D,!j0PTJ>',
				'a`gy*7ah$t',
				'oN!CS;||XJ'
			],
			birthday: '1981-09-30T23:01:59.365Z',
			isFinished: true,
			id: '6'
		},
		{
			alias: 'Jason Moen',
			interventions: [
				'+tzo\\^b`DV',
				67080,
				'rH>]_&zGLy',
				'6xqvB?fiXq',
				25099,
				35253,
				'tZ^>w$>zW6',
				'+}:E[ifF@<',
				'9+kq7LPzC5',
				45960
			],
			birthday: '2000-10-16T14:54:46.383Z',
			isFinished: false,
			id: '7'
		},
		{
			alias: 'Wendy Kirlin',
			interventions: [
				30291,
				3404,
				87091,
				'ID7tA,{0`J',
				'49c?B{6/7>',
				'vfiKm=c<q[',
				'+u_v1?hA69',
				'ysQ9B>LOX5',
				23394,
				76873
			],
			birthday: '2005-10-16T09:18:06.941Z',
			isFinished: false,
			id: '8'
		}
	]

	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} stext="Dar de alta" />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(beneficiary => (
						<Link
							href={`/beneficiaries/${beneficiary.id}`}
							key={beneficiary.id}
						>
							<CardBeneficiary key={beneficiary.id} beneficiary={beneficiary} />
						</Link>
					))}
				</div>
			</div>
			{showModal ? <CreateModal closeModal={toggleModal} /> : null}
		</main>
	)
}
