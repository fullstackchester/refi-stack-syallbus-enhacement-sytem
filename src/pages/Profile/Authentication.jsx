import React, { useRef, useEffect, useState } from 'react'
import { useFirebase } from '../../js/FirebaseContext'

export default function Authentication() {
    const emailRef = useRef()
    const passRef = useRef()

    const { currentUser } = useFirebase()
    const uid = currentUser.uid

    const editCredentials = [
        {
            id: 'email',
            name: 'email',
            label: 'Email',
            type: 'email',
            ref: emailRef,
            description: 'Use an valid email address',
            isRequired: true,
            currentVal: currentUser.email
        },
        {
            id: 'pass',
            name: 'pass',
            label: 'Password',
            type: 'password',
            ref: passRef,
            isRequired: true,
            description: 'Use an strong pattern of password, minimum of 6 characters.',
        },
    ]

    useEffect(() => {

    }, [])

    function saveCredentials(e) {
        e.preventDefault()
        const cred = {
            email: emailRef.current.value,
            password: passRef.current.value
        }
    }

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm text-zinc-600 px-5 font-semibold'>Security</div>
            <form
                onSubmit={saveCredentials}
                id='security-form' name='security-form' spellCheck={false} className='w-full flex-1 px-5 py-3'>
                {editCredentials.map((val, k) => {
                    return (
                        <label
                            key={k}
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
                                className='border border-zinc-200 p-2 outline-none focus:border-sky-300 rounded-md w-80' />
                            <p className='text-xs font-medium mt-1 text-zinc-500'>{val.description} </p>
                        </label>
                    )
                })}
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
