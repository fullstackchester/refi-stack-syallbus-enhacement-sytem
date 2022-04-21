import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LongInput, { LongTextArea } from '../../components/Inputs/LongInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'

function SubjectEdit() {

    const id = useParams()
    const [error, setError] = useState()
    const { writeData } = useFirebase()
    const [subject, setSubject] = useState({})
    const courseCodeRef = useRef()
    const courseTitleRef = useRef()
    const creditUnitRef = useRef()
    const courseDescriptionRef = useRef()
    const nav = useNavigate()
    const EditSubjectData = [
        {
            id: 'course-code',
            label: 'Course code',
            type: 'text',
            placeholder: 'IT 101',
            required: true,
            defaultValue: subject.courseCode,
            ref: courseCodeRef
        },
        {
            id: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            required: true,
            defaultValue: subject.subjectTitle,
            ref: courseTitleRef
        },
        {
            id: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            required: true,
            defaultValue: subject.creditUnits,
            ref: creditUnitRef
        },


    ]

    useEffect(() => {
        const getCurrentData = onValue(ref(database, 'subject/' + id.id), snapshot => {
            if (snapshot.exists()) {
                setSubject(snapshot.val())
            } else {
                console.log('There is no data')
            }
        })

        return getCurrentData
    }, [])

    function UpdateSubject(e) {
        e.preventDefault()
        const updatedSubject = {
            subjectId: subject.subjectId,
            courseCode: courseCodeRef.current.value,
            subjectTitle: courseTitleRef.current.value,
            creditUnits: creditUnitRef.current.value,
            subjectDescription: courseDescriptionRef.current.value
        }
        writeData('subject/', updatedSubject, updatedSubject.subjectId)
            .then(() => {
                alert('Subject updated')
            }).catch((err) => {
                alert('Failed to update subject')
            });

    }

    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='h-auto w-[80%] bg-white shadow-md rounded-md'>
                <main className='h-auto min-h-[500px] p-5 flex flex-col'>
                    <form
                        onSubmit={UpdateSubject}
                        id='edit-subject-form'
                        name='edit-subject-form'
                        spellCheck='false'
                        className=' flex-1'>

                        {EditSubjectData && EditSubjectData.map((val, key) => {
                            return (
                                <label
                                    key={key}
                                    htmlFor={id}
                                    className='w-full h-auto border-b border-zinc-100 py-5 flex flex-row'>
                                    <span className='w-auto min-w-[15rem] text-zinc-600 font-medium flex items-center'>{val.label}</span>

                                    <input
                                        id={val.id}
                                        ref={val.ref}
                                        label={val.label}
                                        required={val.required}
                                        type={val.type}
                                        defaultValue={val.defaultValue}
                                        className=' border border-zinc-300 flex-1 py-2 px-3 outline-none rounded-md text-zinc-700 
                                        text-base ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'
                                    />
                                </label>

                            )
                        })}
                        <label
                            htmlFor={id}
                            className='w-full h-auto border-b border-zinc-100 py-5 flex flex-row'>
                            <span className='w-auto min-w-[15rem] text-zinc-600 font-medium flex items-center'>{`Subject Description`} </span>
                            <textarea
                                id={`course-description`}
                                rows={8}
                                type={`text`}
                                placeholder={`Enter your text here`}
                                ref={courseDescriptionRef}
                                required={true}
                                defaultValue={subject.subjectDescription}
                                className=' border border-zinc-300 flex-1 py-2 px-3 outline-none rounded-md text-zinc-700 whitespace-pre-line 
                                text-base ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300 resize-none' />
                        </label>

                    </form>

                </main>
                <footer className='h-12 border-t border-zinc-200 flex items-center justify-end'>
                    <button
                        onClick={() => nav(`/subjects/${subject.subjectId}`)}
                        className='h-full w-14 text-md font-medium text-zinc-700 hover:bg-zinc-200 hover:text-sky-600 px-4'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        type='submit'
                        form='edit-subject-form'
                        className='h-full w-14 text-md font-medium text-zinc-700 hover:bg-zinc-200 hover:text-sky-600 px-4'>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>

                </footer>

            </div>

        </div>
    )
}

export default SubjectEdit