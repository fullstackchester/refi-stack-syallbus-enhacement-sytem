import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
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
            setSubject(snapshot.val())
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
        closeModal()
    }

    return (
        <div className='h-auto p-10 flex justify-center'>

            <div className='w-[80%] bg-white shadow-md rounded-md'>
                <main className='h-auto min-h-[500px] flex flex-col p-5'>
                    <h1 className='text-5xl text-zinc-700 text-center '>{subject.courseCode} </h1>
                    <h2 className='text-md font-medium text-center text-zinc-600 '>{subject.subjectTitle} </h2>
                    <h2 className='text-md font-medium text-zinc-600 text-center '>{`Credit units: ${subject.creditUnits}`} </h2>
                    <p className='text-md text-zinc-700 mt-4 border-red-600 flex-1 text-justify px-10'>{subject.subjectDescription}</p>
                    <Modal
                        dialogTitle={`Delete subject?`}
                        dialogMessage={dialogMessage}
                        handleClose={closeModal}
                        buttonTitle={`Delete`}
                        dedicatedFunction={deleteSubject}
                        isOpen={isOpen} />
                </main>
                <footer className='h-12 border-t border-zinc-200 flex justify-end'>
                    <button
                        onClick={openModal}
                        className='h-full w-14 text-md text-zinc-700 hover:bg-zinc-200 hover:text-sky-600'>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            nav('/subjects/' + subject.subjectId + '/edit')
                        }}
                        className='h-full w-14 text-md text-zinc-700 hover:bg-zinc-200 hover:text-sky-600'>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </footer>

            </div>
        </div>
    )
}
