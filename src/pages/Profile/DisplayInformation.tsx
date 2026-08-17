import { onValue, ref, update } from 'firebase/database'
import { useRef, useState, useEffect } from 'react'
import { database, storage } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import PopNotif from '../../components/PopNotif'
import defaultAvatar from '../../assets/Images/avatar.png'
import { snapshotValue } from '../../js/FirebaseData'
import type { UserProfile } from '../../types/domain'

export default function DisplayInformation() {
    const { currentUser, uploadFile } = useFirebase()
    const nameRef = useRef<HTMLInputElement>(null)
    const empIdRef = useRef<HTMLInputElement>(null)
    const photoUrlRef = useRef<HTMLInputElement>(null)
    const deptRef = useRef<HTMLSelectElement>(null)

    // States for changing profile avatar
    const [avatar, setAvatar] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const [currDept, setCurrDept] = useState('')

    const uid = currentUser?.uid
    const [current, setCurrent] = useState<UserProfile | null>(null)

    const [isOpen, setOpen] = useState(false)

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (!uid) return
        return onValue(ref(database, `users/${uid}`), snapshot => {
            if (snapshot.exists()) {
                const profile = snapshotValue<UserProfile>(snapshot)
                setCurrent(profile)
                setCurrDept(profile.department)
            }
        })
    }, [uid])

    useEffect(() => {
        if (!uid) return
        return onValue(ref(database, `users/${uid}/photoUrl`), snapshot => {
            if (snapshot.exists()) {
                getDownloadURL(storageRef(storage, `avatars/${uid}/${snapshotValue<string>(snapshot)}`))
                    .then((url) => {
                        const avatar = document.getElementById('profile-avatar')
                        if (avatar instanceof HTMLImageElement) avatar.src = url
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
    }, [uid])

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(typeof reader.result === 'string' ? reader.result : null)
            }
            reader.readAsDataURL(avatar)
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
            currentVal: current?.employeeId
        },
        {
            id: 'name',
            name: 'name',
            label: 'Name',
            type: 'text',
            ref: nameRef,
            isRequired: true,
            currentVal: current?.name
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

    function saveInfo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!uid || !current || !empIdRef.current || !nameRef.current || !deptRef.current) return
        setLoading(true)
        const newProfile = {
            photoUrl: avatar ? avatar.name : current.photoUrl,
            employeeId: empIdRef.current.value,
            name: nameRef.current.value,
            department: deptRef.current.value
        }

        update(ref(database, `users/${uid}`), newProfile)
            .then(() => {
                if (!avatar) {
                    setLoading(false)
                    setOpen(true)
                    return
                }
                return uploadFile(avatar, `avatars/${uid}/${newProfile.photoUrl}`)
                    .then(() => {
                        setLoading(false)
                        setOpen(true)
                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                    });
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            });
    }

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm text-zinc-600 px-5 font-semibold'>Basic Information</div>
            <PopNotif
                isOpen={isOpen}
                handleClose={() => setOpen(false)}
                dialogTitle='Update success'
                dialogMessage='Successfully updated profile'
            />
            <form
                onSubmit={saveInfo}
                id='profile-form' name='profile-form' spellCheck={false} className='w-full flex-1 px-5 py-3'>
                <div className='h-auto flex flex-row items-center mb-5'>
                    <img src={preview ?? defaultAvatar} id='profile-avatar' alt='Profile avatar' className='h-20 w-20 object-cover rounded-full border' />

                    <label className='text-xs p-1 text-white bg-zinc-600 hover:bg-zinc-700 rounded-md ml-3 cursor-pointer'>
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
                                        ref={val.id === 'employee-id' ? empIdRef : nameRef}
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
            <footer className='h-14 flex  items-center justify-end px-5 border-t border-zinc-100'>
                <button
                    type='submit'
                    form='profile-form'
                    className='p-2 border border-transparent rounded-md text-white bg-sky-600 hover:bg-sky-700 flex flex-row'>
                    <span className='text-xs font-medium mr-2'>Update Profile</span>
                    {isLoading && <FontAwesomeIcon icon={faCircleNotch} size='sm' spin />}
                </button>
            </footer>
        </>
    )
}
