import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'
import { auth, database } from '../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthError } from '../js/AuthError'
import { useFirebase } from '../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'


export default function Login() {

    const [err, setErr] = useState()
    const [loading, setLoading] = useState(false)
    const [isFetching, setFecthing] = useState(true)
    const [role, setRole] = useState()
    const emailRef = useRef()
    const passRef = useRef()

    const nav = useNavigate()
    const { currentUser } = useFirebase()


    useEffect(() => {
        if (currentUser !== null) {
            onValue(ref(database, `users/${currentUser.uid}`), user => {
                if (user.exists()) {
                    if (user.val().userType === 'faculty') {
                        nav('/subjects')
                    } else {
                        nav('/reports')
                    }

                }
            })
        }
        setFecthing(false)
    }, [currentUser])



    function loginUser(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(function () {
            const email = emailRef.current.value
            const pass = passRef.current.value

            if (email === '' || pass === '') {
                setErr('Email and Password and required')
                setLoading(false)
            } else {
                signInWithEmailAndPassword(auth, email, pass)
                    .then(() => {
                        setLoading(false)
                    }).catch((err) => {
                        for (let key in AuthError) {
                            if ((err.code).replace('auth/', '') === key) {
                                setErr(AuthError[key])
                                setLoading(false)
                            }
                        }
                    });
            }
        }, 300)
    }


    return (
        <>
            {
                !isFetching ?
                    <div className='w-full h-screen  bg-gradient-to-b from-zinc-200 to-white flex justify-center items-center'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='w-[400px] h-auto bg-white rounded-md p-10'>
                            <h1 className={`text-center text-2xl text-zinc-600 font-medium`}>Login</h1>
                            <form
                                spellCheck={false}
                                className={`text-zinc-700 mt-10 flex flex-col`}
                                onSubmit={loginUser}>
                                {[
                                    {
                                        name: 'email',
                                        label: 'Email Address',
                                        placeholder: 'johnsmith@bulsu.edu.ph',
                                        type: 'text',
                                        required: true,
                                        onChange: () => setErr(''),
                                        ref: emailRef
                                    }, {
                                        name: 'password',
                                        label: 'Password',
                                        placeholder: 'Minimum of 8 characters',
                                        type: 'password',
                                        required: true,
                                        onChange: () => setErr(''),
                                        ref: passRef
                                    },
                                ].map((val, key) =>
                                    <label
                                        key={key}
                                        htmlFor={val.name}
                                        className={`flex flex-col ${val.type === 'password' ? 'mt-4' : ''}`}>
                                        <span className={`text-xs font-medium text-zinc-600`}>{val.label}</span>
                                        <input
                                            id={val.name}
                                            name={val.name}
                                            type={val.type}
                                            ref={val.ref}
                                            placeholder={val.placeholder}
                                            onChange={val.onChange}
                                            className={`p-3 border border-zinc-300 ring-1 ring-transparent outline-none
                                rounded-md focus:ring-sky-300 focus:border-sky-300 text-sm`}
                                        />
                                    </label>
                                )}

                                <div className='h-auto min-h-[1.5rem] w-auto text-xs text-red-500
                     flex items-center justify-end font-medium p-1 mt-2'>
                                    {err}
                                </div>
                                <button
                                    type={`submit`}
                                    className={`p-2 bg-zinc-700 text-white text-sm outline-none border border-transparent
                        hover:bg-zinc-800 rounded-md mt-2 flex flex-row items-center justify-center`} >
                                    <span className='flex-1'>Login</span>
                                    {loading && <FontAwesomeIcon icon={faCircleNotch} className={`ml-1`} spin />}
                                </button>
                            </form>
                            <div className={`h-10 mt-3 text-xs font-medium text-zinc-600 flex items-center justify-center`}>
                                Don't have an account? <Link to={`/signup`} className={`hover:underline ml-1 text-sky-600`}>Signup</Link>
                            </div>
                        </motion.div>
                    </div>
                    :
                    <div className='w-full h-screen  bg-gradient-to-b from-zinc-200 to-white flex justify-center items-center'>
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
            }
        </>
    )
}
