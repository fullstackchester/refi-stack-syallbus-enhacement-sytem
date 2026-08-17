import { useState, useEffect, useRef } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { snapshotValue } from '../../js/FirebaseData'
import { getErrorMessage } from '../../js/errors'
import type { UserProfile } from '../../types/domain'
import defaultAvatar from '../../assets/Images/avatar.png'

export function ProfileEdit() {
    const { currentUser, writeData, uploadFile } = useFirebase()
    const nav = useNavigate()
    const [avatar, setAvatar] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [err, setErr] = useState('')
    const [currentData, setCurrentData] = useState<UserProfile | null>(null)


    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const empIdRef = useRef<HTMLInputElement>(null)
    const photoUrlRef = useRef<HTMLInputElement>(null)
    const deptRef = useRef<HTMLSelectElement>(null)

    const inputClass = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'



    useEffect(() => {

        if (!currentUser) {
            nav('/login')
            return
        }

        const getCurrent = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            if (snapshot.exists()) {
                setCurrentData(snapshotValue<UserProfile>(snapshot))
            } else {
                setErr('User not found')
            }
        })

        return getCurrent
    }, [currentUser, nav])

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(typeof reader.result === 'string' ? reader.result : null)
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
            initialValue: currentData?.employeeId,
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'John Smith',
            type: 'text',
            required: true,
            initialValue: currentData?.name,
        },
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'johnsmith@bulsu.edu.ph',
            type: 'text',
            required: true,
            initialValue: currentData?.email,
        },

        {
            name: 'department',
            label: 'Department',
            placeholder: '',
            type: 'select',
            required: true,
            initialValue: currentData?.department,
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


    const SaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!currentData || !empIdRef.current || !nameRef.current || !emailRef.current || !deptRef.current) {
            setErr('Profile data is unavailable')
            return
        }
        const updateProfile = {
            photoUrl: avatar ? avatar.name : currentData.photoUrl ?? '',
            uid: currentData.uid,
            employeeId: empIdRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            userType: currentData.userType,
            department: deptRef.current.value
        }

        writeData('users/', updateProfile, updateProfile.uid)
            .then(() => {
                if (!avatar) {
                    nav('/profile')
                    return
                }
                return uploadFile(avatar, `avatars/${currentData.uid}/${avatar.name}`)
                    .then(() => nav('/profile'))
            }).catch((err) => {
                setErr(getErrorMessage(err))
            });


    }

    return (
        <div className='h-auto py-5 px-10 flex justify-center'>
            <div className='h-auto w-[80%] border border-zinc-200 bg-white rounded-md'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`Edit profile`} </span>

                </header>
                <main className='h-auto flex flex-col items-center '>
                    <form
                        onSubmit={SaveChanges}
                        spellCheck={`false`}
                        id='edit-profile-form'
                        name='edit-profile-form'
                        className='h-auto min-h-[400px] w-full px-10 border-zinc-600'>

                        <div className='h-auto w-full  flex flex-col items-center'>

                            <label
                                className='w-full h-auto flex flex-row items-center py-5 border-b border-zinc-100'
                                htmlFor='photo-url'>
                                <span
                                    className='w-1/6 text-sm text-zinc-600 font-medium flex items-center' >Profile photo</span>
                                <input
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
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
                                <img
                                    className='h-14 w-14 rounded-[100%] object-cover mb-1 bg-zinc-400'
                                    src={preview ?? defaultAvatar}
                                    alt='Profile preview' />
                                <span className='h-fit w-fit border border-transparent bg-zinc-700 p-2 text-white text-sm
                                rounded-md hover:bg-zinc-500 cursor-pointer ml-2'>
                                    Change
                                </span>
                            </label>


                        </div>
                        {ChangeProfileFields && ChangeProfileFields.map((val, key) => {
                            return (
                                <label
                                    key={key}
                                    htmlFor={val.name}
                                    className={`${val.type !== 'hidden' ? 'py-5 border-b border-zinc-100' : ''}
                                     w-full h-auto flex flex-row`}>
                                    <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>
                                        {val.label}
                                    </span>
                                    {val.type !== 'select' ?
                                        <input
                                            id={val.name}
                                            ref={val.name === 'employee-id' ? empIdRef : val.name === 'name' ? nameRef : emailRef}
                                            required={val.required}
                                            type={val.type}
                                            defaultValue={val.initialValue}
                                            placeholder={val.placeholder}
                                            className={inputClass} /> :
                                        <select
                                            className={inputClass}
                                            id={val.name}
                                            ref={deptRef}
                                            required={val.required} >
                                            {departmentOptions && departmentOptions.map((val, key) => {
                                                return (
                                                    <option key={key} value={val.value}>
                                                        {val.title}
                                                    </option>
                                                )
                                            })}

                                        </select>}
                                </label>
                            )
                        })}
                    </form>
                </main>
                {/* footer will be the place for the navigations/ buttons */}
                <footer className='h-14 flex items-center justify-end px-10'>
                    {err && <span className='mr-auto text-xs text-red-600'>{err}</span>}
                    <button
                        form='edit-profile-form'
                        type='submit'
                        className='h-fit w-fit text-sm font-normal text-white bg-sky-600 py-2 px-4
                        hover:bg-sky-700 border border-transparent rounded-md '>
                        Save changes
                    </button>
                </footer>
            </div>
        </div>
    )
}
