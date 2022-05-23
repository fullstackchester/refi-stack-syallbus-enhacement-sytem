import { updateEmail, updatePassword } from 'firebase/auth'
import { ref, update } from 'firebase/database'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Confirm from '../../components/PopConfirmation'
import PopNotif from '../../components/PopNotif'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'

export default function Authentication() {
    const emailRef = useRef()
    const passRef = useRef()

    const { currentUser, role, deleteAccount, deleteData } = useFirebase()
    const uid = currentUser.uid

    const [open, setOpen] = useState(false)
    const [openDel, setOpenDel] = useState(false)
    const nav = useNavigate()

    const [isLoading, setLoading] = useState(false)

    const editCredentials = [
        {
            id: 'email',
            name: 'email',
            label: 'New email',
            type: 'email',
            ref: emailRef,
            description: 'Use an valid email address',
            isRequired: true,
            currentVal: currentUser.email
        },
        {
            id: 'pass',
            name: 'pass',
            label: 'New password',
            type: 'password',
            ref: passRef,
            isRequired: true,
            description: 'Use an strong pattern of password, minimum of 6 characters.',
        },
    ]


    function saveCredentials(e) {
        e.preventDefault()

        updateEmail(currentUser, emailRef.current.value)
            .then(() => {
                updatePassword(currentUser, passRef.current.value)
                    .then(() => {
                        update(ref(database, `users/${uid}`), { email: emailRef.current.value })
                            .then(() => {
                                setOpen(true)
                            }).catch((err) => {

                            });
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err)
            });
    }

    function DeleteAccount(e) {
        e.preventDefault()
        deleteData(`users/${uid}`)
            .then(() => {
                deleteAccount()
                    .then(() => {
                        nav('/')
                    }).catch((err) => {
                        console.log(err)
                    });
            }).catch((err) => {
                console.log(err)
            });
    }

    return (
        <>
            <PopNotif
                dialogTitle={'Update successfully'}
                dialogMessage={'Successfully updated your email and password'}
                isOpen={open}
                handleClose={() => setOpen(false)} />

            <Confirm
                isOpen={openDel}
                handleClose={() => setOpenDel(false)}
                dialogTitle='Account Deletion'
                dialogMessage='Are you sure you want to delete your account?'
                buttonTitle='Delete Account'
                dedicatedFunction={DeleteAccount}
            />

            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm text-zinc-600 px-5 font-semibold'>Security</div>
            <form
                onSubmit={saveCredentials}
                id='security-form' name='security-form' spellCheck={false} className='w-full flex-1 px-5 py-3'>
                {editCredentials.map((val, key) => {
                    return (
                        <label
                            key={key}
                            htmlFor={val.id}
                            className='flex flex-col text-sm text-zinc-700 mb-5'>
                            <span className='font-medium'>{val.label}</span>
                            <input
                                name={val.name}
                                id={val.id}
                                ref={val.ref}
                                type={val.type}
                                required={val.isRequired}
                                defaultValue={val.currentVal}
                                className='border border-zinc-200 p-2 outline-none focus:border-sky-300 rounded-sm w-80
                                ring-1 ring-transparent focus:ring-sky-300 transition-colors' />
                            <p className='text-xs font-medium mt-1 text-zinc-500'>{val.description}</p>
                        </label>
                    )
                })}
                {role !== 'administrator' &&
                    <div className='border-t border-zinc-100 h-20 py-5'>
                        <label
                            className='flex flex-col text-sm text-zinc-700 mb-5'>
                            <span className='font-medium'>{'Account Deletion'}</span>
                            <p className='text-xs font-medium mt-1 text-zinc-500'>
                                {'This will delete all of your data ( basic information, passwords )'}
                            </p>
                            <button
                                onClick={() => setOpenDel(true)}
                                type='button'
                                className='w-fit h-fit text-xs border border-transparent outline-none p-2
                             bg-red-600 hover:bg-red-700 text-white rounded-md mt-3'>
                                Delete Account
                            </button>
                        </label>
                    </div>}
            </form>

            <footer className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>
                <button
                    type='submit'
                    form='security-form'
                    className='text-xs p-2 border border-transparent rounded-md bg-sky-600 text-white
                     font-medium hover:bg-sky-700'>
                    Save changes</button>
            </footer>
        </>
    )
}
