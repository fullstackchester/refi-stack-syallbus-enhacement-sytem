import { onValue, ref, update } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import PopNotif from '../../components/PopNotif'
import { useFirebase } from '../../js/FirebaseContext'

export default function FacultyProfile() {

    const style = `border border-sky-200 p-2 outline-none
     focus:border-sky-300 rounded-sm w-80 ring-1 ring-transparent focus:ring-sky-300
      transition-colors disabled:border-zinc-100 bg-white disabled:bg-white disabled:text-zinc-600`

    const [currDept, setCurrDept] = useState()
    const [currType, setCurrType] = useState()
    // references
    const idRef = useRef()
    const nameRef = useRef()
    const deptRef = useRef()
    const typeRef = useRef()

    const { role } = useFirebase()


    const [faculty, setFaculty] = useState({})
    const [edit, setEdit] = useState(true)

    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const { uid } = useParams()
    useEffect(() => {
        onValue(ref(database, `users/${uid}`), snapshot => {
            if (snapshot.exists()) {
                setFaculty(snapshot.val())
                setCurrDept(snapshot.val().department)
                setCurrType(snapshot.val().userType)

            }
        })
    }, [])

    function EditFaculty(e) {
        e.preventDefault()
        setLoading(true)
        update(ref(database, `users/${uid}`),
            {
                employeeId: idRef.current.value,
                name: nameRef.current.value,
                department: deptRef.current.value,
                userType: typeRef.current.value
            }
        )
            .then(() => {
                setOpen(true)
                setEdit(true)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            });
    }

    const department = [
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

    const accType = [
        { value: '', title: 'Select Account Type', },
        { value: 'administrator', title: 'Administrator', },
        { value: 'area chair', title: 'Area Chair', },
        { value: 'faculty', title: 'Faculty', },
    ]

    const fields = [
        {
            id: 'employee-id',
            name: 'employee-id',
            label: 'Employee Id',
            type: 'text',
            ref: idRef,
            disabled: edit,
            isRequired: true,
            description: '',
            currentVal: faculty.employeeId
        },
        {
            id: 'name',
            name: 'name',
            label: 'Name',
            type: 'text',
            ref: nameRef,
            disabled: edit,
            isRequired: true,
            description: 'Includes suffixes e.g.(Ph.D, MSIT, Jr.)',
            currentVal: faculty.name
        },
        {
            id: 'dept',
            name: 'dept',
            label: 'Department',
            type: 'select',
            ref: deptRef,
            value: currDept,
            disabled: edit,
            isRequired: true,
            description: '',
            options: department,
            onChange: (e) => setCurrDept(e.target.value)
        },

        {
            id: 'account-type',
            name: 'account-type',
            label: 'Account type',
            type: 'select',
            ref: typeRef,
            value: currType,
            disabled: edit,
            isRequired: true,
            description: 'Select account type to promote user',
            options: accType,
            onChange: (e) => setCurrType(e.target.value)
        },
    ]
    return (
        <>
            <PopNotif
                isOpen={isOpen}
                handleClose={() => setOpen(false)}
                dialogTitle='Update success'
                dialogMessage='Successfully updated the faculty profile' />

            <div className='h-14 flex flex-row items-center justify-between border-b border-zinc-100 px-5'>
                <span className='h-max w-max text-sm text-zinc-600 font-semibold '>Profile</span>
                {role === 'administrator' &&
                    <button
                        type='button'
                        onClick={() => {
                            edit ? setEdit(false) : setEdit(true)
                        }}
                        className='text-xs p-2 border border-transparent rounded-md bg-zinc-600 text-white
                     font-medium hover:bg-zinc-700 ml-3 w-14'>
                        {edit ? 'Edit' : <FontAwesomeIcon icon={faCancel} size='sm' />}
                    </button>}
            </div>
            <div className='flex-1 px-5 pb-3 overflow-y-auto '>
                <form
                    onSubmit={EditFaculty}
                    id='edit-faculty-form'
                    name='edit-faculty-form'
                    spellCheck={false}
                    className='w-full flex-1 py-3'>
                    {
                        fields.map((val, k) =>
                            <label
                                key={k}
                                htmlFor={val.id}
                                className='flex flex-col text-sm text-zinc-700 mb-5'>
                                <span className='font-medium'>{val.label}</span>
                                {val.type !== 'select' ?
                                    <input
                                        name={val.name}
                                        id={val.id}
                                        ref={val.ref}
                                        disabled={val.disabled}
                                        type={val.type}
                                        required={val.isRequired}
                                        defaultValue={val.currentVal}
                                        className={style} /> :
                                    <select
                                        name={val.name}
                                        id={val.id}
                                        ref={val.ref}
                                        disabled={val.disabled}
                                        value={val.value}
                                        onChange={val.onChange}
                                        className={style}
                                        required={val.isRequired}>
                                        {val.options.map((value, key) =>
                                            <option key={key} value={value.value}>{value.title}</option>)}

                                    </select>}
                                <p className='text-xs font-medium mt-1 text-zinc-500'>{val.description} </p>
                            </label>
                        )
                    }
                </form>
            </div>
            <footer className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>
                {!edit &&
                    <button
                        type='submit'
                        form='edit-faculty-form'
                        className='text-xs p-2 border border-transparent rounded-md bg-sky-600 text-white 
                        font-medium hover:bg-sky-700'>
                        Save changes
                        {isLoading && <FontAwesomeIcon icon={faCircleNotch} size='sm' className='ml-2' spin />}
                    </button>}
            </footer>
        </>
    )
}
