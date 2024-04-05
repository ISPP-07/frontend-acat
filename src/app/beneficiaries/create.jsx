'use client'
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
/* eslint-enable no-unused-vars */
import { useRouter } from 'next/navigation'
import axios from 'axios'

export function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function CreateModal({ closeModal }) {
    const [errors, setErrors] = useState(null)
    const router = useRouter()

    const formattedDate = getCurrentDate()

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)

        const valid = validateForm(formData)

        if (!valid) {
            return
        }

        // WARNING this might be deleted in future development
        formData.append('registration_date', formattedDate)
        formData.append('age', '0')

        // up until here
        const object = {}
        formData.forEach((value, key) => (object[key] = value))
        const json = JSON.stringify(object)
        axios
            .post(process.env.NEXT_PUBLIC_BASE_URL + '/acat/patient', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                // Navigate to the newly created beneficiary
                closeModal()
                router.push('/beneficiaries/' + response.data.id.toString())
            })
            .catch(function (error) {
                alert(
                    `Ha habido un error al crear al nuevo beneficiario: ${error.response.data.detail[0].msg}`
                )
            })
    }

    const validateForm = formData => {
        let valid = true
        const newError = {}

        const contactPhoneRegExp = /^\d{0,15}$/
        const dniRegExp = /^\d{8}[A-Z]$/
        const nieRegExp = /^[XYZ]\d{7}[A-Z]$/
        const passportRegExp = /^[A-Z]{2}\d{7}$/

        if (!contactPhoneRegExp.test(formData.get('contact_phone'))) {
            valid = false
            newError.contact_phone = 'El teléfono no es válido'
        }

        // This is a XOR operation, if one of the three conditions is true, the result is true
        if (
            !dniRegExp.test(formData.get('nid')) ^
            !nieRegExp.test(formData.get('nid')) ^
            !passportRegExp.test(formData.get('nid'))
        ) {
            if (formData.get('nid') !== '') {
                valid = false
                newError.nid =
                    'El DNI/NIE/Pasaporte no coincide con el formato esperado'
            } else if (!formData.get('nid') === '') {
                newError.nid = ''
            }
        }

        const birthDate = new Date(formData.get('birth_date'))
        const firstAppointmentDate = new Date(
            formData.get('first_appointment_date')
        )
        const today = new Date()

        if (formData.get('birth_date') === '' || birthDate > today) {
            valid = false
            newError.birth_date = 'La fecha de nacimiento debe ser pasada'
        }
        if (
            !formData.get('first_appointment_date') === '' &&
            firstAppointmentDate > today
        ) {
            valid = false
            newError.first_appointment_date =
                'La fecha de la primera atención no puede ser futura'
        }

        setErrors(newError)
        return valid
    }

    return (
        <div
            className='fixed top-0 left-0 bg-gray-600 bg-opacity-50 h-full w-full flex items-center justify-center z-50'
            id='close'
        >
            <div className='p-10 border h-fit shadow-lg rounded-xl bg-white font-Varela text-black'>
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className='bg-red-500 text-white text-xl rounded-md shadow-lg w-[30px] h-[30px] mb-3'
                    >
                        X
                    </button>
                </div>
                <form
                    onSubmit={onSubmit}
                    className='flex flex-row flex-wrap justify-center max-w-[600px] gap-3 mt-2'
                    data-testid='form'
                >
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='name' className='hidden md:block text-black'>
                            Nombre <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Nombre'
                                id='name'
                                name='name'
                                required={true}
                            />
                        </div>
                        <span className='text-red-500'>{errors?.name}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label
                            htmlFor='first_surname'
                            className='hidden md:block text-black'
                        >
                            Primer apellido <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Primer apellido'
                                id='first_surname'
                                name='first_surname'
                                required={true}
                            />
                        </div>
                        <span className='text-red-500'>{errors?.first_surname}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label
                            htmlFor='second_surname'
                            className='hidden md:block text-black'
                        >
                            Segundo apellido
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Segundo apellido'
                                id='second_surname'
                                name='second_surname'
                            />
                        </div>
                        <span className='text-red-500'>{errors?.second_surname}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='alias' className='hidden md:block text-black'>
                            Alias
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Alias'
                                id='alias'
                                name='alias'
                            />
                        </div>
                        <span className='text-red-500'>{errors?.alias}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='nid' className='hidden md:block text-black'>
                            DNI/NIF/Pasaporte <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='DNI'
                                id='nid'
                                name='nid'
                                required={true}
                            />
                        </div>
                        <span className='text-red-500'>{errors?.nid}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label
                            htmlFor='dossier_number'
                            className='hidden md:block text-black'
                        >
                            Número de registro <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z'
                                />
                            </svg>
                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Numero de registro'
                                id='dossier_number'
                                name='dossier_number'
                                required={true}
                            />
                        </div>
                        <span className='text-red-500'>{errors?.dossier_number}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='birth-date' className='text-black'>
                            Fecha de nacimiento <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <input
                                className='flex items-center rounded-xl p-1 w-full'
                                type='date'
                                id='birth-date'
                                name='birth_date'
                                required={true}
                            />
                        </div>
                        <span className='text-red-500'>{errors?.birth_date}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='address' className='hidden md:block text-black'>
                            Dirección
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                                />
                            </svg>

                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Dirección'
                                id='address'
                                name='address'
                            />
                        </div>
                        <span className='text-red-500'>{errors?.address}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='gender' className='hidden md:block text-black'>
                            Sexo <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z'
                                />
                            </svg>
                            <select
                                className='flex items-center rounded-xl p-1 pl-6 w-full bg-white'
                                type='text'
                                placeholder='Sexo'
                                id='gender'
                                name='gender'
                                required={true}
                            >
                                <option value=''>Selecciona uno</option>
                                <option value='Man'>Hombre</option>
                                <option value='Woman'>Mujer</option>
                            </select>
                        </div>
                        <span className='text-red-500'>{errors?.gender}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label
                            htmlFor='contact_phone'
                            className='hidden md:block text-black'
                        >
                            Teléfono de contácto
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                                />
                            </svg>

                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='tel'
                                placeholder='Teléfono'
                                id='contact_phone'
                                name='contact_phone'
                            />
                        </div>
                        <span className='text-red-500'>{errors?.contact_phone}</span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label htmlFor='first_appointment_date' className='text-black'>
                            Primera atención
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <input
                                className='flex items-center rounded-xl p-1 w-full'
                                type='date'
                                id='first_appointment_date'
                                name='first_appointment_date'
                            />
                        </div>
                        <span className='text-red-500'>
                            {errors?.first_appointment_date}
                        </span>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-5/12'>
                        <label
                            htmlFor='first_technician'
                            className='hidden md:block text-black'
                        >
                            Técnico
                        </label>
                        <div className='relative flex items-center border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                />
                            </svg>

                            <input
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Técnico que lo ha atendido'
                                id='first_technician'
                                name='first_technician'
                            />
                        </div>
                    </fieldset>
                    <fieldset className='flex flex-col w-full md:w-10/12'>
                        <label htmlFor='observation' className='hidden md:block text-black'>
                            Observaciones
                        </label>
                        <div className='relative flex items-start border-2 rounded-xl border-gray-200 bg-white'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='w-4 h-4 absolute top-1 left-0 m-1'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184'
                                />
                            </svg>

                            <textarea
                                className='flex items-center rounded-xl p-1 pl-6 w-full'
                                type='text'
                                placeholder='Observaciones sobre el beneficiario'
                                id='observation_text'
                                name='observation'
                            />
                        </div>
                    </fieldset>
                    <div className='flex justify-center w-full mt-6'>
                        <input
                            data-testid='submit'
                            type='submit'
                            value='Dar de alta'
                            className='bg-green-500 hover:bg-green-700 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4 md:w-2/4 text-center'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CreateModal
