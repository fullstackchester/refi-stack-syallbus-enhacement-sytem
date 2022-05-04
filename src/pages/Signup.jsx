import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ref, set } from 'firebase/database'
import { database } from '../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faAsterisk } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../js/FirebaseContext'


function Signup() {

    const nav = useNavigate()
    const { signup } = useFirebase()
    const [err, setErr] = useState()
    const [loading, setloading] = useState(false)
    const idRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const passRef = useRef()
    const confirmPassRef = useRef()


    function signUpUser(e) {
        e.preventDefault()
        setloading(true)

        if (passRef.current.value === confirmPassRef.current.value) {

            signup(emailRef.current.value, passRef.current.value)
                .then((userCredentials) => {
                    
                    const newAccount = {
                        uid: userCredentials.user.uid,
                        employeeId: idRef.current.value,
                        name: nameRef.current.value,
                        department: '',
                        email: emailRef.current.value,
                        userType: 'faculty',
                    }

                    set(ref(database, `users/${userCredentials.user.uid}`), newAccount)
                        .then(() => {
                            nav('/dashboard')
                        }).catch((err) => {
                            setErr(err.code)
                        });
                    setloading(false)

                }).catch((err) => {
                    setErr(err.code)
                });
                
        } else {
            setErr(`Passwords don't match`)
            setloading(false)
        }
    }

    return (
        <div className='w-full min-h-screen h-auto flex justify-center items-center p-10'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-[500px] h-auto bg-white border border-zinc-200 rounded-md shadow-sm p-10'>
                <h1 className={`text-center text-2xl text-zinc-700 font-medium mb-4`}>Signup</h1>
                <form
                    spellCheck={false}
                    onSubmit={signUpUser}
                    className={`flex flex-col`}>
                    {
                        [{
                            name: 'employee-id',
                            label: 'Employee ID',
                            placeholder: 'HIS00AA3125',
                            type: 'text',
                            required: true,
                            onChange: () => setErr(''),
                            ref: idRef
                        },
                        {
                            name: 'name',
                            label: 'Name',
                            placeholder: 'John Smith',
                            type: 'text',
                            required: true,
                            onChange: () => setErr(''),
                            ref: nameRef
                        },
                        {
                            name: 'email',
                            label: 'Email Address',
                            placeholder: 'johnsmith@bulsu.edu.ph',
                            type: 'text',
                            required: true,
                            onChange: () => setErr(''),
                            ref: emailRef
                        },
                        {
                            name: 'password',
                            label: 'Password',
                            placeholder: 'Minimum of 8 characters',
                            type: 'password',
                            required: true,
                            onChange: () => setErr(''),
                            ref: passRef
                        },
                        {
                            name: 'confirm-password',
                            label: 'Confirm password',
                            placeholder: 'Retype password',
                            type: 'password',
                            required: true,
                            onChange: () => setErr(''),
                            ref: confirmPassRef
                        },].map((val, key) =>
                            <label
                                key={key}
                                htmlFor={val.name}
                                className={`flex flex-col ${val.name !== 'confirm-password' ? 'mb-4' : ''}`}>
                                <span className={`text-xs font-medium text-zinc-600`}>
                                    {val.label} {val.required ? <FontAwesomeIcon className={`text-red-600`} icon={faAsterisk} size={`xs`} /> : ''}
                                </span>
                                <input
                                    id={val.name}
                                    name={val.name}
                                    type={val.type}
                                    ref={val.ref}
                                    placeholder={val.placeholder}
                                    required={val.required}
                                    onChange={val.onChange}
                                    className={`p-3 border border-zinc-300 ring-1 ring-transparent outline-none 
                                    rounded-md focus:ring-sky-300 focus:border-sky-300 text-sm`}
                                />
                            </label>
                        )
                    }
                    <div className={`h-auto min-h-[1.5rem] text-xs text-red-600 font-medium text-right p-1 mt-2`}>{err}</div>
                    <button
                        type={`submit`}
                        className={`p-2 bg-zinc-700 text-white text-sm outline-none border border-transparent
                        hover:bg-zinc-800 rounded-md mt-2 flex flex-row items-center justify-center`} >
                        Login
                        {loading && <FontAwesomeIcon icon={faCircleNotch} className={`ml-1`} spin />}
                    </button>
                </form>
                <div className={`h-10 mt-3 text-xs font-medium text-zinc-600 flex items-center justify-center`}>
                    Already have an account? <Link to={`/`} className={`hover:underline ml-1 text-sky-600`}>Login</Link>
                </div>
            </motion.div>
        </div>
    )
}

export default Signup