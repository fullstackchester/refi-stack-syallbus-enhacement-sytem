import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import LongInput, { LongTextArea } from '../../components/Inputs/LongInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'

function SubjectEdit() {

    const id = useParams()
    const [error, setError] = useState()
    const [subject, setSubject] = useState({})
    const [courseCode, setCourseCode] = useState()
    const [courseTitle, setCourseTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const courseCodeRef = useRef()
    const courseTitleRef = useRef()
    const creditUnitRef = useRef()
    const courseDescriptionRef = useRef()

    const updatedSubject = {
        subjectId: subject.subjectId,
        courseCode: courseCodeRef.current,
        subjectTitle: courseTitleRef.current,
        creditUnits: creditUnitRef.current,
        subjectDescription: courseDescriptionRef.current
    }

    const EditSubjectData = [
        {
            id: 'course-code',
            label: 'Course code',
            type: 'text',
            placeholder: 'IT 101',
            onChange: (e) => setCourseCode(e.target.value),
            required: true,
            defaultValue: subject.courseCode,
            ref: courseCodeRef
        },
        {
            id: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: (e) => setCourseTitle(e.target.value),
            required: true,
            defaultValue: subject.subjectTitle,
            ref: courseTitleRef
        },
        {
            id: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            onChange: (e) => setCreditUnit(e.target.value),
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
        console.log(updatedSubject)
    }

    return (
        <div className='h-auto py-5 px-10'>
            <div className='h-auto w-full bg-white shadow-md rounded-md'>
                <header className='h-12 border-b border-zinc-100 flex items-center px-5'>
                    <span className='text-sm text-zinc-500 font-medium'>{`Subject id: ${subject.subjectId}`} </span>

                </header>
                <main className='h-auto min-h-[500px] p-5 flex flex-col'>
                    <form
                        onSubmit={UpdateSubject}
                        id='edit-subject-form'
                        name='edit-subject-form'
                        spellCheck='false'
                        className=' flex-1'>

                        {EditSubjectData && EditSubjectData.map((val, key) => {
                            return (
                                <LongInput
                                    key={key}
                                    id={val.id}
                                    innerRef={val.ref}
                                    label={val.label}
                                    onChange={val.onChange}
                                    currentData={val.defaultValue}
                                    placeholder={val.placeholder}
                                    required={val.required}
                                    type={val.type}
                                />
                            )
                        })}
                        <LongTextArea
                            id={`course-description`}
                            label={`Course Description`}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            currentData={subject.subjectDescription}
                            placeholder={`Enter your description here...`}
                            innerRef={courseDescriptionRef}
                            required={true}
                            type={`text`}
                        />

                    </form>

                </main>
                <footer className='h-12 border-t border-zinc-200 flex items-center justify-end'>
                    <button
                        className='h-full w-14 text-md font-medium text-zinc-700 hover:bg-zinc-200 hover:text-sky-600 px-4'>
                        <FontAwesomeIcon icon={faBan} />
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