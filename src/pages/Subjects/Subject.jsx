import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const Subject = () => {

    const subjectId = useParams()
    const [subject, setSubject] = useState({})
    const nav = useNavigate()

    useEffect(() => {

        const getSubject = onValue(ref(database, 'subject/' + subjectId.id), snapshot => {
            return setSubject(snapshot.val())
        })

        return getSubject
    }, [])

    return (
        <div className='h-auto min-h-[400px] border border-zinc-100 rounded-lg shadow-md'>
            <main className='h-full p-4 grid grid-cols-4'>
                <h1 className='text-4xl text-zinc-600 font-semibold col-span-3'>{subject.courseCode}</h1>

                <h3 className='text-lg text-zinc-800 col-span-3'>{subject.subjectTitle}</h3>
                <p className='text-zinc-500 text-sm mt-3 col-span-3 overflow-hidden border'>
                    {subject.subjectDescription}
                </p>

            </main>
            <footer className='h-auto flex justify-end p-2'>
                <button
                    className='bg-zinc-600 text-sm text-white py-2 px-4 outline-none rounded-md hover:bg-zinc-700 mr-3' >
                    <FontAwesomeIcon icon={faTrashCan} className='mr-2' /> Delete
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        nav('/subjects/' + subject.subjectId + '/edit')
                    }}
                    className='bg-sky-600 text-sm text-white py-2 px-4 outline-none rounded-md hover:bg-sky-700' >
                    <FontAwesomeIcon icon={faEdit} className='mr-2' />Edit </button>

            </footer>
        </div>
    )
}
