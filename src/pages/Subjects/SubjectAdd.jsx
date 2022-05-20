import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import LoadingButton from '../../components/LoadingButton'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PopNotif from '../../components/PopNotif'

export const SubjectAdd = () => {
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const [loadingState, setState] = useState(false)
    const [error, setError] = useState('')
    const { writeData } = useFirebase()

    const [isOpen, setOpen] = useState(false)
    const nav = useNavigate()
    const inputClass = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'

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
        {
            name: 'course-description',
            label: 'Course description',
            type: 'textarea',
            row: 8,
            placeholder: 'Enter your text here...',
            onChange: (e) => setCourseDescription(e.target.value),
            required: true,
        },

    ]


    function addSubject(e) {
        e.preventDefault()
        setState(true)
        const newSubject = {
            subjectId: uuidv4(),
            courseCode: courseCode,
            subjectTitle: subjectTitle,
            creditUnits: creditUnit,
            subjectDescription: courseDescription
        }
        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                setState(false)
                setOpen(true)
            }).catch((e) => {
                setError(e.message)
            });

    }
    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center py-5'>
            <PopNotif
                isOpen={isOpen}
                handleClose={() => {
                    setOpen(false)
                    nav('/subjects')
                }}
                dialogTitle='Add Success'
                dialogMessage={`Successfully added the subject ${subjectTitle}`} />

            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 border-b border-zinc-200 flex items-center px-2'>
                    <button type='button'
                        className='h-8 w-8 rounded-full hover:bg-zinc-100'
                        onClick={() => nav(-1)}>
                        <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                    </button>
                    <span className='font-semibold text-lg ml-3'>New Subject</span>
                </header>
                <main className='flex-1 px-10 flex flex-col'>
                    <form
                        onSubmit={addSubject}
                        id='add-subject-form'
                        name='add-subject-form'
                        spellCheck='false'
                        className=' flex-1'>
                        {AddSubjectData.map((val, key) =>
                            <label
                                key={key}
                                htmlFor={val.id}
                                className={`${val.type !== 'textarea' ? ' border-b border-zinc-100' : ''}
                                    py-5 w-full h-auto flex flex-row`} >
                                <span
                                    className='w-1/6 text-sm text-zinc-600 font-medium flex items-center' >
                                    {val.label}
                                </span>
                                {val.type !== 'textarea' ?
                                    <input
                                        id={val.id}
                                        onChange={val.onChange}
                                        label={val.label}
                                        required={val.required}
                                        type={val.type}
                                        placeholder={val.placeholder}
                                        defaultValue={val.defaultValue}
                                        className={inputClass} /> :
                                    <textarea
                                        id={val.id}
                                        onChange={val.onChange}
                                        label={val.label}
                                        required={val.required}
                                        placeholder={val.placeholder}
                                        rows={val.row}
                                        defaultValue={val.defaultValue}
                                        className={`resize-none ${inputClass}`} />
                                }
                            </label>
                        )}
                    </form>
                </main>
                <footer className='h-14 flex items-center justify-end px-10'>
                    <LoadingButton
                        form={`add-subject-form`}
                        buttonType='submit'
                        loadingState={loadingState}
                        title={`Add subject`} />
                </footer>
            </div>
        </div>
    )
}
