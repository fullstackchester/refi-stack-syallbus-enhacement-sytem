import { onValue, ref, update } from 'firebase/database'
import React, { useRef, useState, useEffect } from 'react'
import { database, storage } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import Modal from '../../components/Modal'

export default function DisplayInformation() {
    const { currentUser, uploadFile } = useFirebase()
    const nameRef = useRef()
    const empIdRef = useRef()
    const photoUrlRef = useRef()
    const deptRef = useRef()

    // States for changing profile avatar
    const [avatar, setAvatar] = useState()
    const [preview, setPreview] = useState()

    const [currDept, setCurrDept] = useState()

    const uid = currentUser.uid
    const [current, setCurrent] = useState({})

    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        return onValue(ref(database, `users/${uid}`), snapshot => {
            if (snapshot.exists()) {
                setCurrent(snapshot.val())
                setCurrDept(snapshot.val().department)
                getDownloadURL(storageRef(storage, `avatars/${uid}/${snapshot.val().photoUrl}`))
                    .then((url) => {
                        const avatar = document.getElementById('profile-avatar')
                        avatar.setAttribute('src', url)
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
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

    const profileInfo = [
        {
            id: 'employee-id',
            name: 'employee-id',
            label: 'Employee Id',
            type: 'text',
            ref: empIdRef,
            isRequired: true,
            description: 'Use the valid Id number (e.g. Faculty Id)',
            currentVal: current.employeeId
        },
        {
            id: 'name',
            name: 'name',
            label: 'Name',
            type: 'text',
            ref: nameRef,
            isRequired: true,
            currentVal: current.name
        },
        {
            id: 'dept',
            name: 'dept',
            label: 'Department',
            type: 'select',
            ref: '',
            isRequired: true,
            description: 'Choose your designated department',
        },
    ]

    function saveInfo(e) {
        e.preventDefault()
        const updateProfile = {
            photoUrl: avatar ? avatar.name : current.photoUrl,
            employeeId: empIdRef.current.value,
            name: nameRef.current.value,
            department: deptRef.current.value
        }

        update(ref(database, `users/${uid}`), updateProfile)
            .then(() => {
                uploadFile(avatar, `avatars/${uid}/${avatar.name}`)
                    .then(() => {
                        setOpen(true)
                    }).catch((err) => {

                    });
            }).catch((err) => {

            });
    }

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm text-zinc-600 px-5 font-semibold'>Basic Information</div>
            <Modal
                dialogTitle={'Update Succesfull'}
                dialogMessage={'Your profile information updated successfully.'}
                isOpen={isOpen}
                handleClose={() => setOpen(false)} />
            <form
                onSubmit={saveInfo}
                id='profile-form' name='profile-form' spellCheck={false} className='w-full flex-1 px-5 py-3'>
                <div className='h-auto flex flex-row items-center mb-5'>
                    <img src={preview} id='profile-avatar' className='h-20 w-20 object-cover rounded-full border' />
                    <label className='text-xs p-1 text-white bg-zinc-600 hover:bg-zinc-700 rounded-md ml-3 cursor-pointer'>
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
                            accept={`image/*`}
                            type='file'
                            className='hidden' />
                        Change
                    </label>
                </div>
                {
                    profileInfo.map((val, k) => {
                        return (
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
                                        type={val.type}
                                        required={val.isRequired}
                                        defaultValue={val.currentVal}
                                        className='border border-zinc-200 p-2 outline-none focus:border-sky-300 rounded-sm w-80
                                ring-1 ring-transparent focus:ring-sky-300 transition-colors' /> :
                                    <select
                                        name={val.name}
                                        id={val.id}
                                        ref={deptRef}
                                        value={currDept}
                                        onChange={(e) => setCurrDept(e.target.value)}
                                        required={val.isRequired}
                                        className='border border-zinc-200 p-2 outline-none focus:border-sky-300 rounded-sm w-80 
                                    ring-1 ring-transparent focus:ring-sky-300 transition-colors'
                                    >
                                        {
                                            [
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
                                            ].map((v, k) => <option key={k} value={v.value}>{v.title}</option>)
                                        }
                                    </select>}
                                <p className='text-xs font-medium mt-1 text-zinc-500'>{val.description} </p>
                            </label>
                        )
                    })
                }
            </form>
            <footer className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>
                <button
                    type='submit'
                    form='profile-form'
                    className='text-xs p-2 border border-transparent rounded-md bg-sky-600 text-white
                     font-medium hover:bg-sky-700'>
                    Update Profile</button>
            </footer>
        </>
    )
}
