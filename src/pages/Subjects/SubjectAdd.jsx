import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import LoadingButton from '../../components/LoadingButton'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PopNotif from '../../components/PopNotif'
import Input from '../../components/Inputs/Input'

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
            name: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: (e) => setSubjectTitle(e.target.value),
            required: true,
            width: 'col-span-4'
        },
        {
            name: 'course-code',
            label: 'Course code',
            type: 'text',
            placeholder: 'IT 101',
            onChange: (e) => setCourseCode(e.target.value),
            required: true,
            width: 'col-span-2'
        },
        {
            name: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            onChange: (e) => setCreditUnit(e.target.value),
            required: true,
            width: 'col-span-2'
        },
        {
            name: 'course-description',
            label: 'Course description',
            type: 'textarea',
            row: 8,
            placeholder: 'Enter your text here...',
            onChange: (e) => setCourseDescription(e.target.value),
            required: true,
            width: 'col-span-4'
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
                <header className='h-14 border-b border-zinc-100 flex items-center px-2'>
                    <button type='button'
                        className='h-8 w-8 rounded-full hover:bg-zinc-100'
                        onClick={() => nav(-1)}>
                        <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                    </button>
                    <span className='font-semibold text-lg ml-3'>New Subject</span>
                </header>
                <main className='flex-1 py-2 px-3 flex flex-col'>
                    <form
                        onSubmit={addSubject}
                        id='add-subject-form'
                        name='add-subject-form'
                        spellCheck='false'
                        className=' flex-1 grid grid-cols-4 gap-1 place-content-start'>
                        {
                            AddSubjectData.map((v, k) => {
                                if (v.type !== 'textarea') {
                                    return (
                                        <Input key={k} htmlFor={v.id} label={v.label} width={v.width} >
                                            <input
                                                type={v.type}
                                                id={v.id}
                                                required={v.required}
                                                onChange={v.onChange}
                                                placeholder={v.placeholder}
                                                className='h-14 bg-zinc-100 p-3 text-sm outline-none border border-transparent 
                                                ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all'
                                            />
                                        </Input>
                                    )
                                } else {
                                    return (
                                        <Input key={k} htmlFor={v.id} label={v.label} width={v.width} >
                                            <textarea
                                                type={v.type}
                                                id={v.id}
                                                onChange={v.onChange}
                                                required={v.required}
                                                placeholder={v.placeholder}
                                                className='h-40 bg-zinc-100 p-3 text-sm outline-none border border-transparent 
                                                ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all resize-none'/>
                                        </Input>
                                    )
                                }
                            })
                        }

                    </form>
                </main>
                <footer className='h-14 flex items-center justify-end px-5'>
                    <LoadingButton
                        form={`add-subject-form`}
                        buttonType='submit'
                        loadingState={loadingState}
                        title={`Add Subject`} />
                </footer>
            </div>
        </div>
    )
}
