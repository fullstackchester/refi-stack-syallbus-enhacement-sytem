import React, { useState, useEffect, useRef } from 'react'
import { push, child, ref, update, get, onValue } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faCheckCircle, faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { ref as storageRef } from 'firebase/storage'

export function ProfileEdit() {
    const { currentUser, writeData } = useFirebase()
    const nav = useNavigate()
    const [avatar, setAvatar] = useState()
    const [preview, setPreview] = useState()
    const [err, setErr] = useState()
    const [currentData, setCurrentData] = useState({})

    const nameRef = useRef()
    const emailRef = useRef()
    const empIdRef = useRef()
    const photoUrlRef = useRef()
    const deptRef = useRef()



    useEffect(() => {

        const getCurrent = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            if (snapshot.exists()) {
                setCurrentData(snapshot.val())
            } else {
                setErr('User not found')
            }
        })

        return getCurrent
    }, [])

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(avatar)
        } else {

        }
    }, [avatar])


    const ChangeProfileFields = [
        {
            name: 'employee-id',
            label: 'Employee ID',
            placeholder: 'HIS00AA3125',
            type: 'text',
            required: true,
            initialValue: currentData.employeeId,
            ref: empIdRef
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'John Smith',
            type: 'text',
            required: true,
            initialValue: currentData.name,
            ref: nameRef
        },
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'johnsmith@bulsu.edu.ph',
            type: 'text',
            required: true,
            initialValue: currentData.email,
            ref: emailRef
        },
    ]

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


    const SaveChanges = (e) => {
        e.preventDefault()
        const updateProfile = {
            photoUrl: avatar ? avatar.name : '',
            uid: currentData.uid,
            employeeId: empIdRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            userType: currentData.userType,
            department: deptRef.current.value
        }

        writeData('users/', updateProfile, updateProfile.uid)
            .then(() => {
                alert('UPdate successful')
            }).catch((err) => {
                alert(err.message)
            });


    }

    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='h-auto w-[80%] border-zinc-400'>
                <main className='h-auto p-5 flex flex-col items-center bg-white'>
                    <form
                        onSubmit={SaveChanges}
                        spellCheck={`false`}
                        id='edit-profile-form'
                        name='edit-profile-form'
                        className='h-auto min-h-[400px] w-[500px] p-5 border-zinc-600'>

                        <div className='h-auto w-full border-zinc-300 flex flex-col items-center mb-3'>
                            <img
                                className='h-40 w-40 border-2 border-zinc-800 rounded-[100%] object-cover mb-1 bg-white'
                                src={preview} />
                            <label htmlFor='photo-url'>

                                <span
                                    className='border border-transparent text-zinc-700 font-medium 
                                    text-sm cursor-pointer hover:underline' >Change photo</span>

                                <input
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) {
                                            setAvatar(file)
                                        } else {
                                            setAvatar(null)
                                        }
                                    }}
                                    ref={photoUrlRef}
                                    form={`edit-profile-form`}
                                    id={`photo-url`}
                                    type={`file`}
                                    accept={`image/*`}
                                    className='hidden' />
                            </label>


                        </div>
                        {ChangeProfileFields && ChangeProfileFields.map((val, key) => {
                            return (
                                <label
                                    className='flex flex-col mb-4'
                                    htmlFor={val.name}
                                    key={key}>
                                    <span className='text-sm text-zinc-800 font-medium'>{val.label} </span>
                                    <input
                                        className='outline-none border border-zinc-300 px-3 py-3 rounded-sm ring-1 ring-transparent
                                    focus:ring-sky-400 focus:border-sky-400 bg-gray-50 text-gray-700 text-md'
                                        id={val.name}
                                        type={val.type}
                                        ref={val.ref}
                                        onChange={val.onchange}
                                        defaultValue={val.initialValue}
                                        required={val.required} />
                                </label>
                            )
                        })}
                        <label
                            className='flex flex-col mb-4'
                            htmlFor={`department`} >
                            <span className='text-sm text-zinc-800 font-medium'>{`Department`} </span>
                            <select
                                className='outline-none border border-zinc-300 px-3 py-3 rounded-sm ring-1 ring-transparent
                                    focus:ring-sky-400 focus:border-sky-400 bg-gray-50 text-gray-700 text-md'
                                id={`department`}
                                ref={deptRef}
                                required={true} >
                                {departmentOptions && departmentOptions.map((val, key) => {
                                    return (
                                        <option key={key} value={val.value}>
                                            {val.title}
                                        </option>
                                    )
                                })}

                            </select>
                        </label>
                    </form>

                </main>

                {/* footer will be the place for the navigations/ buttons */}
                <footer className='h-12 border-t border-zinc-200 flex items-center justify-end'>
                    <button
                        form='edit-profile-form'
                        type='submit'
                        className='h-full w-14 text-md font-medium text-zinc-700 hover:bg-zinc-200 hover:text-sky-600 px-4'>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </footer>
            </div>
        </div >
    )
}