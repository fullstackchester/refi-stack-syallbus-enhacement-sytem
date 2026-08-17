import { onValue, ref, update } from 'firebase/database'
import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingButton from 'components/LoadingButton'
import { database } from 'clients/Firebase'
import { snapshotValue } from 'utils/FirebaseData'
import { getErrorMessage } from '../../js/errors'
import type { UserProfile, UserRole } from 'types/domain'

export default function FacultyEdit() {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentData, setData] = useState<UserProfile | null>(null)
    const faculty = useParams()

    const [deptState, setDept] = useState('')
    const [typeState, setType] = useState<UserRole | ''>('')

    const employeeIdRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const deptRef = useRef<HTMLSelectElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)


    useEffect(() => {
        const getCurrentData = onValue(ref(database, `users/${faculty.id}`), snapshot => {
            if (snapshot.exists()) {
                const profile = snapshotValue<UserProfile>(snapshot)
                setData(profile)
                setDept(profile.department)
                setType(profile.userType)
            } else {
                setError('No data found')
            }
        })
        return getCurrentData
    }, [])

    const departmentOptions = [
        {
            value: '',
            title: 'Select Department',
        },
        {
            value: 'Business Analytics',
            title: 'Business Analytics',
        },
        {
            value: 'Service Management',
            title: 'Service Management',
        },
        {
            value: 'Web and Mobile Application Development',
            title: 'Web and Mobile Application Development',
        },
    ]

    const userTypeOptions = [
        {
            value: '',
            title: 'Select Account Type',
        },
        {
            value: 'administrator',
            title: 'Administrator',
        },
        {
            value: 'area chair',
            title: 'Area Chair',
        },
        {
            value: 'faculty',
            title: 'Faculty',
        },
    ]


    const editFacultyFields = [
        {
            name: 'employee-id',
            label: 'Employee ID',
            placeholder: 'e.g. HIS00AA3125',
            type: 'text',
            required: true,
            initialValue: currentData?.employeeId,
            ref: employeeIdRef
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'e.g. John A. Smith',
            type: 'text',
            required: true,
            initialValue: currentData?.name,
            ref: nameRef
        },
        {
            name: 'email',
            label: 'Email',
            placeholder: 'john.smith.a@bulsu.edu.ph',
            type: 'text',
            required: true,
            initialValue: currentData?.email,
            ref: emailRef
        },
        {
            name: 'department',
            label: 'Department',
            placeholder: '',
            type: 'select',
            required: true,
            initialValue: deptState,
            ref: deptRef,
            options: departmentOptions,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setDept(e.target.value)
        },
        {
            name: 'userType',
            label: 'Account type',
            placeholder: '',
            type: 'select',
            required: true,
            initialValue: typeState,
            ref: typeRef,
            options: userTypeOptions,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as UserRole)
        },
    ]

    function saveFaculty(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!currentData || !emailRef.current || !nameRef.current || !employeeIdRef.current || !deptRef.current || !typeRef.current) {
            setError('Faculty data is unavailable')
            return
        }
        setLoading(true)
        const updatedFaculty = {
            uid: currentData.uid,
            email: emailRef.current.value,
            name: nameRef.current.value,
            employeeId: employeeIdRef.current.value,
            department: deptRef.current.value,
            userType: typeRef.current.value
        }
        update(ref(database, `users/${currentData.uid}`), updatedFaculty)
            .then(() => {
                setError('Updated successfully')
                setLoading(false)
            }).catch((err) => {
                setError(getErrorMessage(err))
                setLoading(false)
            });
    }

    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='base-container'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`Edit Faculty`} </span>
                </header>
                <main className='h-auto min-h-[300px] px-10 flex flex-col'>
                    <form
                        onSubmit={saveFaculty}
                        id='edit-faculty-form'
                        name='edit-faculty-form'
                        spellCheck='false'
                        className=' flex-1'>
                        {editFacultyFields && editFacultyFields.map((val, key) =>
                            <label
                                key={key}
                                htmlFor={val.name}
                                className={`${val.type !== 'hidden' ? 'py-5 border-b border-zinc-100' : ''}
                                     w-full h-auto flex flex-row`}>
                                <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>
                                    {val.label}
                                </span>
                                {
                                    val.type !== 'select' ?
                                        <input
                                            id={val.name}
                                            ref={val.name === 'employee-id' ? employeeIdRef : val.name === 'name' ? nameRef : emailRef}
                                            required={val.required}
                                            type={val.type}
                                            defaultValue={val.initialValue}
                                            placeholder={val.placeholder}
                                            className={`input-style`}
                                        /> :
                                        <select
                                            className={`input-style`}
                                            id={val.name}
                                            ref={val.name === 'department' ? deptRef : typeRef}
                                            value={val.initialValue}
                                            onChange={val.onChange}
                                            required={val.required} >
                                            {val.options && val.options.map((vals, key) =>
                                                <option
                                                    key={key}
                                                    value={vals.value}
                                                    className={`text-md`}>
                                                    {vals.title}
                                                </option>
                                            )}
                                        </select>
                                }
                            </label>)}
                    </form>
                </main>
                <footer className={`base-footer`}>
                    {error && error}
                    <LoadingButton
                        form={`edit-faculty-form`}
                        loadingState={isLoading}
                        title={`Save changes`} />
                </footer>
            </div>
        </div>
    )
}
