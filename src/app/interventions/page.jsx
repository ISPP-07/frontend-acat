'use client'
/* eslint-disable no-unused-vars */
import React, { Suspense, useState } from 'react'
/* eslint-enable no-unused-vars */
import CardIntervention from '../components/cardIntervention'
import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'
import Link from 'next/link'

export default function InterventionPage() {
	const [showModal, setShowModal] = useState(false)
	const toggleModal = () => {
		setShowModal(!showModal)
	}
	const data = [
		{
			intervention_date: '2050-11-04T12:00:28.226Z',
			patient: 'Ms. Eleanor Sanford I',
			patient_id: '2',
			technician: 'Michael Harber',
			technician_id: '5',
			id: '51'
		},
		{
			intervention_date: '2001-12-21T04:02:42.394Z',
			patient: 'Ted Goldner',
			patient_id: '4',
			technician: 'Curtis Simonis I',
			technician_id: '3',
			id: '52'
		},
		{
			intervention_date: '1991-03-11T11:28:36.491Z',
			patient: 'Renee Krajcik',
			patient_id: '1',
			technician: 'Vanessa Rutherford DVM',
			technician_id: '3',
			id: '53'
		},
		{
			intervention_date: '2012-12-03T21:30:34.624Z',
			patient: 'Harry Stehr',
			patient_id: '8',
			technician: 'Miss Rosie Trantow',
			technician_id: '5',
			id: '54'
		},
		{
			intervention_date: '2007-09-13T12:25:22.062Z',
			patient: 'Miss Elijah Wolf',
			patient_id: '7',
			technician: 'Holly Watsica',
			technician_id: '9',
			id: '55'
		},
		{
			intervention_date: '2022-06-04T15:54:45.960Z',
			patient: 'Jean Quigley',
			patient_id: '7',
			technician: 'Sabrina Koelpin',
			technician_id: '8',
			id: '56'
		},
		{
			intervention_date: '2027-12-31T05:20:56.723Z',
			patient: 'Marlon Lubowitz',
			patient_id: '8',
			technician: 'Maria Nitzsche',
			technician_id: '9',
			id: '57'
		},
		{
			intervention_date: '2055-08-09T04:56:02.025Z',
			patient: 'Lawrence Tromp',
			patient_id: '3',
			technician: 'Jean Lemke',
			technician_id: '5',
			id: '58'
		},
		{
			intervention_date: '2080-03-30T23:17:29.230Z',
			patient: 'Jessie Breitenberg Sr.',
			patient_id: '7',
			technician: 'Jon Funk',
			technician_id: '8',
			id: '59'
		},
		{
			intervention_date: '2038-06-18T22:05:06.899Z',
			patient: 'Gabriel Carroll Jr.',
			patient_id: '4',
			technician: 'Lela Kohler',
			technician_id: '3',
			id: '60'
		},
		{
			intervention_date: '2055-01-06T16:47:55.125Z',
			patient: 'Jeff Bayer',
			patient_id: '8',
			technician: 'Mr. Harold Wilderman',
			technician_id: '7',
			id: '61'
		},
		{
			intervention_date: '2056-04-25T13:12:47.963Z',
			patient: 'Jeremiah Graham',
			patient_id: '7',
			technician: 'Nellie Bogisich',
			technician_id: '1',
			id: '62'
		},
		{
			intervention_date: '1990-08-13T21:33:41.411Z',
			patient: 'Cary Cassin',
			patient_id: '1',
			technician: 'Hannah Kohler',
			technician_id: '7',
			id: '63'
		},
		{
			intervention_date: '2051-05-31T03:48:22.918Z',
			patient: 'Pam Hilll DDS',
			patient_id: '6',
			technician: 'George Cremin',
			technician_id: '5',
			id: '64'
		},
		{
			intervention_date: '2096-05-29T06:16:42.792Z',
			patient: 'Lynne Orn',
			patient_id: '2',
			technician: 'Noel Dicki DVM',
			technician_id: '3',
			id: '65'
		},
		{
			intervention_date: '2047-07-11T11:50:21.686Z',
			patient: 'Craig Bayer',
			patient_id: '5',
			technician: 'Cornelius Denesik',
			technician_id: '5',
			id: '66'
		},
		{
			intervention_date: '1995-04-25T07:43:02.694Z',
			patient: 'Emanuel Kassulke III',
			patient_id: '6',
			technician: 'Rex Kuphal',
			technician_id: '5',
			id: '67'
		},
		{
			intervention_date: '2002-08-20T10:32:00.817Z',
			patient: 'Violet Harris',
			patient_id: '3',
			technician: 'Leticia Macejkovic',
			technician_id: '5',
			id: '68'
		},
		{
			intervention_date: '2015-09-29T20:12:14.660Z',
			patient: "Wilfred O'Kon",
			patient_id: '2',
			technician: 'Elsie Hilpert',
			technician_id: '6',
			id: '69'
		},
		{
			intervention_date: '2056-10-05T00:59:59.314Z',
			patient: 'Harold Purdy DVM',
			patient_id: '3',
			technician: 'Penny Monahan',
			technician_id: '5',
			id: '70'
		},
		{
			intervention_date: '2022-12-14T18:36:39.226Z',
			patient: 'Jana Beer',
			patient_id: '8',
			technician: 'Bobbie Wintheiser V',
			technician_id: '6',
			id: '71'
		},
		{
			intervention_date: '2014-10-27T21:36:47.724Z',
			patient: 'Dr. Lucy Sanford',
			patient_id: '3',
			technician: 'Travis Price',
			technician_id: '1',
			id: '72'
		},
		{
			intervention_date: '2042-03-21T05:00:11.842Z',
			patient: 'Dr. Elvira Durgan III',
			patient_id: '1',
			technician: 'Ms. Wm Leannon',
			technician_id: '1',
			id: '73'
		},
		{
			intervention_date: '2037-08-11T20:20:35.929Z',
			patient: 'Georgia Daugherty II',
			patient_id: '1',
			technician: 'Becky Cormier',
			technician_id: '1',
			id: '74'
		},
		{
			intervention_date: '1991-10-31T04:42:44.810Z',
			patient: 'Mrs. Brad Bernier',
			patient_id: '3',
			technician: 'Patty Herzog',
			technician_id: '7',
			id: '75'
		},
		{
			intervention_date: '2000-04-12T02:19:59.293Z',
			patient: 'Rolando Quigley',
			patient_id: '7',
			technician: 'Elbert Frami',
			technician_id: '3',
			id: '76'
		},
		{
			intervention_date: '1999-02-11T09:11:39.972Z',
			patient: 'Mr. Marlene Ortiz',
			patient_id: '8',
			technician: 'Mrs. Stuart Doyle',
			technician_id: '8',
			id: '77'
		},
		{
			intervention_date: '2021-09-12T04:24:25.630Z',
			patient: 'Leonard Bruen',
			patient_id: '7',
			technician: 'Becky Dietrich Sr.',
			technician_id: '1',
			id: '78'
		},
		{
			intervention_date: '2011-08-17T13:26:42.960Z',
			patient: 'Nicole Schmidt',
			patient_id: '7',
			technician: 'Monica Cole',
			technician_id: '4',
			id: '79'
		},
		{
			intervention_date: '2018-07-10T15:45:22.943Z',
			patient: 'Christian Anderson Jr.',
			patient_id: '5',
			technician: 'Wesley Kihn PhD',
			technician_id: '1',
			id: '80'
		},
		{
			intervention_date: '2083-11-06T21:43:29.769Z',
			patient: 'Claudia Lesch',
			patient_id: '6',
			technician: 'Georgia Denesik',
			technician_id: '9',
			id: '81'
		},
		{
			intervention_date: '1993-07-25T06:07:03.739Z',
			patient: 'Hannah Lang',
			patient_id: '8',
			technician: 'Sarah Stokes',
			technician_id: '9',
			id: '82'
		},
		{
			intervention_date: '2040-12-23T15:29:09.091Z',
			patient: 'Pat Gleason',
			patient_id: '4',
			technician: 'Boyd Padberg',
			technician_id: '4',
			id: '83'
		},
		{
			intervention_date: '2082-10-16T03:35:28.686Z',
			patient: "Mary O'Conner",
			patient_id: '7',
			technician: 'Jenny Leuschke',
			technician_id: '6',
			id: '84'
		},
		{
			intervention_date: '2090-07-09T01:42:36.691Z',
			patient: 'Sabrina Raynor',
			patient_id: '2',
			technician: 'Nathan Tromp',
			technician_id: '4',
			id: '85'
		},
		{
			intervention_date: '2038-07-03T09:57:45.932Z',
			patient: 'Aubrey Turner',
			patient_id: '2',
			technician: 'Curtis McDermott',
			technician_id: '3',
			id: '86'
		},
		{
			intervention_date: '2060-12-24T17:53:04.021Z',
			patient: 'Johanna Farrell',
			patient_id: '8',
			technician: 'Craig Wisozk II',
			technician_id: '3',
			id: '87'
		},
		{
			intervention_date: '2093-12-10T02:36:28.741Z',
			patient: 'Josephine Fay',
			patient_id: '6',
			technician: 'Heather Hamill',
			technician_id: '3',
			id: '88'
		}
	]
	return (
		<main className="flex w-full">
			<Suspense fallback={<div></div>}>
				<Sidebar />
			</Suspense>
			<div className="w-full h-full flex flex-col items-center">
				<Searchbar handleClick={toggleModal} text="Registrar intervención" />
				<div className="container p-10 flex flex-wrap gap-5 justify-center items-center">
					{data.map(intervention => (
						<Link
							href={`/beneficiaries/${intervention.id}`}
							key={intervention.id}
						>
							<CardIntervention
								key={intervention.id}
								intervention={intervention}
							/>
						</Link>
					))}
				</div>
			</div>
			{/* {showModal ? <Modal closeModal={toggleModal} /> : null} */}
		</main>
	)
}
