"use client";
import {useState} from 'react';
import Searchbar from '../components/searchbar';
import Sidebar from '../components/sidebar';
import Modal from './modal'

export default function Interventions() { 

    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const interventions = [
        {id: 1, name: 'Pérez Jiménez', fecha: '2021-01-01', tipología: 'Reparación', 
        técnico: 'Pablo', motivo: 'Motivo 1', observaciones: 'Observación 1'},
        {id: 2, name: 'Gómez Pérez', fecha: '2021-01-02', tipología: 'Reparación',
        técnico: 'Pablo', motivo: 'Motivo 2', observaciones: 'Observación 2'},
        {id: 3, name: 'Gómez Pérez', fecha: '2021-01-03', tipología: 'Reparación',
        técnico: 'Pablo', motivo: 'Motivo 3', observaciones: 'Observación 3 almacena los cambios en una pila temporal. Puedes tener múltiples stashes y aplicarlos en el orden que desees. También puedes eliminar elementos de la pila de stashes cuando ya no los '}
    ]

    const openModal = (intervention) => {
        setSelectedIntervention(intervention);
        setModalIsOpen(true)
    };

    const interventionsList = interventions.map((i) => (
        <tr key={i.id} onClick={() => openModal(i)}>
            <td className="py-2 px-4 text-center border text-black">{i.name}</td>
            <td className="py-2 px-4 text-center border text-black">{i.fecha}</td>
        </tr>
    ));

    return (
			<main className="absolute bg-white w-full h-full ">
				<Sidebar />
				<Searchbar />
                <Modal isVisible={modalIsOpen} onClose={() => setModalIsOpen(false)} selectedIntervention={selectedIntervention}/>
                <div className="flex items-center justify-center h-full">
                    <table className="w-full md:w-2/3 lg:w-1/2 border border-collapse border-gray-300">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-center border text-black">Name</th>
                            <th className="py-2 px-4 text-center border text-black">Fecha</th>
                        </tr>
                        </thead>
                        <tbody>{interventionsList}</tbody>
                    </table>
                </div>
			</main>
		)
};