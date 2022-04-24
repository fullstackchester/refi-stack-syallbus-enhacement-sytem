import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LongInput, { LongTextArea } from '../../components/Inputs/LongInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import LoadingButton from '../../components/LoadingButton'

function SubjectEdit() {

    const id = useParams()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
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

        {
            id: 'course-description',
            label: 'Course description',
            type: 'textarea',
            placeholder: 'Enter your text here...',
            required: false,
            row: 8,
            defaultValue: subject.subjectDescription,
            ref: courseDescriptionRef
        },


    ]
    const inputClass = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'

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
        setLoading(true)
        const updatedSubject = {
            subjectId: subject.subjectId,
            courseCode: courseCodeRef.current.value,
            subjectTitle: courseTitleRef.current.value,
            creditUnits: creditUnitRef.current.value,
            subjectDescription: courseDescriptionRef.current.value
        }
        writeData('subject/', updatedSubject, updatedSubject.subjectId)
            .then(() => {
                setLoading(false)
                nav(`/subjects/${id.id}`)
            }).catch((err) => {
                alert('Failed to update subject')
            });

    }

    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='h-auto w-[80%] bg-white shadow-md rounded-md'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`Edit subject`} </span>
                </header>
                <main className='h-auto min-h-[500px] px-10 flex flex-col'>
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
                                    htmlFor={val.id}
                                    className={`${val.type !== 'textarea' ? ' border-b border-zinc-100' : ''}
                                    py-5 w-full h-auto flex flex-row`} >
                                    <span
                                        className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'
                                    >
                                        {val.label}
                                    </span>

                                    {val.type !== 'textarea' ?
                                        <input
                                            id={val.id}
                                            ref={val.ref}
                                            label={val.label}
                                            required={val.required}
                                            type={val.type}
                                            defaultValue={val.defaultValue}
                                            className={inputClass} /> :
                                        <textarea
                                            id={`course-description`}
                                            rows={8}
                                            type={`text`}
                                            placeholder={`Enter your text here`}
                                            ref={courseDescriptionRef}
                                            required={true}
                                            defaultValue={subject.subjectDescription}
                                            className={`${inputClass} resize-none`} />}
                                </label>

                            )
                        })}
                    </form>

                </main>
                <footer className='h-14 flex items-center justify-end px-10'>

                    <LoadingButton
                        form={`edit-subject-form`}
                        type={`submit`}
                        title={`Save changes`}
                        loadingState={loading} />

                </footer>

            </div>

        </div>
    )
}

export default SubjectEdit