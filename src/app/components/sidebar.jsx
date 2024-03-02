'use client'
import Image from 'next/image'
import Link from 'next/link'
import './components.css'
/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */
export default function Sidebar() {
	return (
		<div className="absolute h-screen rounded-md border border-solid w-[300px] shadow-xl">
			<div className="absolute h-32 bg-white rounded-none w-[299px] ">
				<Image
					src="/acat.jpg"
					className="absolute rounded-none top-[21px] left-[27px]"
					width={250}
					height={80}
				></Image>
			</div>
			<div className="absolute top-[138px] w-[300px] flex flex-col leading-6 opacity-100 gap-[12px]">
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/family.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/beneficiaries"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Beneficiarios
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/square-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link2"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Dar de alta
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/bye.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link3"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Finalizados
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/calendar.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/interventions"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Intervenciones
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/square-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/link5"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Crear intervencion
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/face.svg"
						width={18}
						height={18}
						className="relative left-[10px]"
					></Image>
					<Link
						href="/link9"
						className="ml-5 font-Varela text-171a1fcf text-base text3"
					>
						Usuarios
					</Link>
				</div>
				<div className="flex items-center text-gray-900 whitespace-no-wrap text-xl cursor-pointer justify-start w-[299px] sidebar-menu-item">
					<Image
						src="/face-plus.svg"
						width={18}
						height={18}
						className="relative left-[30px]"
					></Image>
					<Link
						href="/create-user"
						className="ml-10 font-Varela text-171a1fcf text-base text4"
					>
						Crear nuevo ususario
					</Link>
				</div>
			</div>
			<hr className="w-3/4 h-8 bottom-14 left-10 absolute"></hr>
			<button className="absolute w-48 h-8 flex bottom-5 left-12 items-center justify-center text-sm font-normal leading-5 font-Varela text-white rounded-3xl bg-red-500 shadow-xl">
				<Image
					src="/logout.svg"
					width={18}
					height={18}
					className="mr-1"
				></Image>
				<span>Cerrar Sesión</span>
			</button>
		</div>
	)
}
