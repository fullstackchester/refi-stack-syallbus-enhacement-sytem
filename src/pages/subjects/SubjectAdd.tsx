import { useState, type FormEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from 'context/FirebaseContext'
import LoadingButton from 'components/LoadingButton'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PopNotif from 'components/PopNotif'
import Input from 'components/Inputs/Input'
import { getErrorMessage } from '../../js/errors'
import type { Subject } from 'types/domain'

export const SubjectAdd = () => {
    const [courseCode, setCourseCode] = useState('')
    const [subjectTitle, setSubjectTitle] = useState('')
    const [creditUnit, setCreditUnit] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [, setError] = useState('')
    const { writeData } = useFirebase()

    const [isOpen, setOpen] = useState(false)
    const nav = useNavigate()
    const AddSubjectData = [
        {
            name: 'subject-title',
            label: 'Subject title',
            kind: 'input' as const,
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: setSubjectTitle,
            required: true,
            width: 'col-span-4'
        },
        {
            name: 'course-code',
            label: 'Course code',
            kind: 'input' as const,
            type: 'text',
            placeholder: 'IT 101',
            onChange: setCourseCode,
            required: true,
            width: 'col-span-2'
        },
        {
            name: 'credit-unit',
            label: 'Credit units',
            kind: 'input' as const,
            type: 'number',
            placeholder: '3.0',
            onChange: setCreditUnit,
            required: true,
            width: 'col-span-2'
        },
        {
            name: 'course-description',
            label: 'Course description',
            kind: 'textarea' as const,
            row: 8,
            placeholder: 'Enter your text here...',
            onChange: setCourseDescription,
            required: true,
            width: 'col-span-4'
        },
    ]


    function addSubject(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const newSubject: Subject = {
            subjectId: uuidv4(),
            courseCode: courseCode,
            subjectTitle: subjectTitle,
            creditUnits: creditUnit,
            subjectDescription: courseDescription
        }

        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                setLoading(false)
                setOpen(true)
            }).catch((error: unknown) => {
                setError(getErrorMessage(error))
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
                                if (v.kind === 'input') {
                                    return (
                                        <Input key={k} htmlFor={v.name} label={v.label} width={v.width} >
                                            <input
                                                type={v.type}
                                                id={v.name}
                                                required={v.required}
                                                onChange={(event) => v.onChange(event.currentTarget.value)}
                                                placeholder={v.placeholder}
                                                className='h-14 bg-zinc-100 p-3 text-sm outline-hidden border border-transparent 
                                                ring-2 ring-transparent rounded-xs focus:ring-sky-300 transition-all'
                                            />
                                        </Input>
                                    )
                                } else {
                                    return (
                                        <Input key={k} htmlFor={v.name} label={v.label} width={v.width} >
                                            <textarea
                                                id={v.name}
                                                onChange={(event) => v.onChange(event.currentTarget.value)}
                                                required={v.required}
                                                placeholder={v.placeholder}
                                                className='h-40 bg-zinc-100 p-3 text-sm outline-hidden border border-transparent 
                                                ring-2 ring-transparent rounded-xs focus:ring-sky-300 transition-all resize-none'/>
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
                        loadingState={isLoading}
                        title={`Add Subject`} />
                </footer>
            </div>
        </div>
    )
}
