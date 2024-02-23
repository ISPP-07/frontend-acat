"use client";
import {useState} from 'react';
import Modal from 'react-modal';
import styles from './styles/modal.css';

export default function Interventions() { 

    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const interventions = [
        {id: 1, name: 'Pérez Jiménez', fecha: '2021-01-01', tipología: 'Reparación', 
        técnico: 'Pablo', motivo: 'Motivo 1', observaciones: 'Observación 1'},
        {id: 2, name: 'Gómez Pérez', fecha: '2021-01-02', tipología: 'Reparación',
        técnico: 'Pablo', motivo: 'Motivo 2', observaciones: 'Observación 2'},
        {id: 3, name: 'Gómez Pérez', fecha: '2021-01-03', tipología: 'Reparación',
        técnico: 'Pablo', motivo: 'Motivo 3', observaciones: 'Observación 3'}
    ]

    const openModal = (intervention) => {
        setSelectedIntervention(intervention);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedIntervention(null);
        setModalIsOpen(false);
    };

    const interventionsList = interventions.map((i) => (
        <tr key={i.id} onClick={() => openModal(i)}>
            <td className="text-center">{i.name}</td>
            <td className="text-center">{i.fecha}</td>
        </tr>
    ));

    return (
        <div>
            <div className="admin-page-container">
                <h1 className="text-center">Interventions</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>{interventionsList}</tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Intervention Details"
                className="modal custom-modal"
                overlayClassName="overlay"
                shouldCloseOnOverlayClick={true}
            >
                {selectedIntervention && (
                    <div>
                        <p>{selectedIntervention.name} Datos de la intervención</p>
                        <div onClick={closeModal}><img className='buttonEdit' src="edit.svg"/></div>
                        <div onClick={closeModal}><img className='buttonTrash' src="trash.svg"/></div>
                        <img className='iconCalendar' src="calendar.svg"/>
                        <p className='textPrincipal'>Datos de la intervención</p>
                        <p className='text date' data-date={selectedIntervention.fecha}></p>
                        <p className='text typology' data-typology={selectedIntervention.tipología}></p>
                        <p className='text technician' data-technician={selectedIntervention.técnico}></p>
                        <p className='text motivo' data-motivo={selectedIntervention.motivo}></p>
                        <p className='text observation'>Observación: </p>
                        <p className='text observation2'>{selectedIntervention.observaciones}</p>
                        <button className='button' onClick={closeModal}>X</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};