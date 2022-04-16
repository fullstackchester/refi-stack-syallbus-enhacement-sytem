import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../js/FirebaseContext'
import Modal from '../../components/Modal'

export const Subject = () => {

    const subjectId = useParams()
    const [subject, setSubject] = useState({})
    const nav = useNavigate()
    const { deleteData } = useFirebase()
    let [isOpen, setIsOpen] = useState(false)
    const dialogMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus lectus id tortor sodales, ac scelerisque dolor scelerisque. Vestibulum vitae tellus et mauris eleifend imperdiet.'

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    useEffect(() => {

        const getSubject = onValue(ref(database, 'subject/' + subjectId.id), snapshot => {
            return setSubject(snapshot.val())
        },
            {
                onlyOnce: true,
            })

        return getSubject
    }, [])


    function deleteSubject() {
        // deleteData('subject/' + subject.subjectId)
        //     .then(() => {
        //         alert('Subject deleted!')
        //         nav('/subjects')
        //     }).catch(() => {
        //         alert('failed to delete subject!')
        //     });
        alert('DELETING SUBJECT')
    }

    return (
        <div className='h-auto min-h-[600px] border border-zinc-100 rounded-lg shadow-md'>
            <main className='h-auto p-10 grid grid-cols-4 border'>
                <h1 className='text-4xl text-zinc-600 font-semibold col-span-3'>{subject.courseCode}</h1>
                <h3 className='text-md text-zinc-500 font-medium col-span-3'>
                    {`Course title: ${subject.subjectTitle}`}
                </h3>
                <h4 className='text-md text-zinc-500 font-medium col-span-3'>
                    {`Credit units: ${subject.creditUnits}`}
                </h4>
                <p className='text-zinc-500 text-md mt-3 col-span-3 overflow-hidden flex-1'>
                    {subject.subjectDescription}
                </p>

            </main>
            <footer className='h-auto flex justify-end px-10 py-2'>
                <Modal
                    dialogTitle={`Delete subject?`}
                    dialogMessage={dialogMessage}
                    handleClose={closeModal}
                    buttonTitle={`Delete`}
                    dedicatedFunction={deleteSubject}
                    isOpen={isOpen} />
                <button
                    onClick={openModal}
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
