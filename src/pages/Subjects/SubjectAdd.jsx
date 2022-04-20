import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import LongInput, { LongTextArea } from '../../components/Inputs/LongInput'

export const SubjectAdd = () => {
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const { writeData } = useFirebase()

    const AddSubjectData = [
        {
            name: 'course-code',
            label: 'Course code',
            type: 'text',
            placeholder: 'IT 101',
            onChange: (e) => setCourseCode(e.target.value),
            required: true,
        },
        {
            name: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: (e) => setSubjectTitle(e.target.value),
            required: true,
        },
        {
            name: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            onChange: (e) => setCreditUnit(e.target.value),
            required: true,
        },

    ]
    const newSubject = {
        subjectId: uuidv4(),
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit,
        subjectDescription: courseDescription
    }

    function addSubject(e) {
        e.preventDefault()
        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                alert('Subject added.')
            }).catch(() => {
                alert('Subject failed to add.')
            });

    }
    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='h-auto w-[80%] bg-white shadow-md rounded-md'>
                <header className='h-12 border-b border-zinc-100 flex items-center px-5'>
                    <span className='text-sm text-zinc-500 font-medium'>{`New subject`} </span>

                </header>
                <main className='h-auto min-h-[500px] p-5 flex flex-col'>
                    <form
                        onSubmit={addSubject}
                        id='add-subject-form'
                        name='add-subject-form'
                        spellCheck='false'
                        className=' flex-1'>

                        {AddSubjectData && AddSubjectData.map((val, key) => {
                            return (
                                <LongInput
                                    key={key}
                                    id={val.id}
                                    label={val.label}
                                    onChange={val.onChange}
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
                            placeholder={`Enter your description here...`}
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
                        form='add-subject-form'
                        className='h-full w-14 text-md font-medium text-zinc-700 hover:bg-zinc-200 hover:text-sky-600 px-4'>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                </footer>
            </div>
        </div>
    )
}
