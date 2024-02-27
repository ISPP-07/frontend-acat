'use client'
import Image from 'next/image'

const Searchbar = () => {
	return (
		<div className='absolute top-10 left-1/4 w-3/6 h-10 flex items-center'>
			<Image width={18} height={18} src="/magnifier.svg" className='relative z-10 ml-1'></Image>
			<input className="absolute rounded-3xl border h-9 font-Varela w-9/12 text-black indent-2.5 pl-6" type="text" placeholder=" Buscar.. " />
			<button className="bg-blue-500 ml-auto mr-4 relative rounded-xl font-Varela text-xs w-9 h-6	">
				<Image src="/filter.svg" className='ml-2' width={20}height={20}></Image>
			</button>
			<button className="bg-green-700 relative rounded-xl font-Varela text-xs w-2/12 h-8 float-right">Dar de alta</button>
		</div>
	)
}
export default Searchbar
