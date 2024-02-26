'use client'
import { useState } from 'react'
import CreateModal from './create'
import Searchbar from '../components/searchbar'
import Sidebar from '../components/sidebar'

export default function Page() {
	const [verModal,setVerModal] = useState(false)
    
	return (
		<main className='wallpaper'>
			<Sidebar/>
            <div>
                <Searchbar/>
                <button className='shadow-s' onClick={()=>setVerModal(true)}>Dar de alta</button>
            </div>
			

			<CreateModal isVisible={verModal} onClose={()=>setVerModal(false)} />
			<button className={`bg-cyan-500 rounded-full top-[550px] relative w-[100px] h-[50px] right-[700px] ${verModal?'blur':''}`} onClick={()=>setVerModal(true)}> Probar modal</button>
		</main>
	)
}
