import { useRef, useState, useEffect, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import { database } from 'clients/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthError } from '../js/AuthError'
import { useFirebase } from 'context/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { snapshotValue } from 'utils/FirebaseData'
import { getErrorCode, getErrorMessage } from '../js/errors'
import type { UserProfile } from 'types/domain'


export default function Login() {

    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [isFetching, setFecthing] = useState(true)
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    const nav = useNavigate()
    const { currentUser, login } = useFirebase()

    useEffect(() => {
        setFecthing(false)
        if (currentUser !== null) {
            return onValue(ref(database, `users/${currentUser.uid}`), user => {
                if (user.exists()) {
                    if (snapshotValue<UserProfile>(user).userType === 'faculty') {
                        nav('/subjects')
                    } else {
                        nav('/reports')
                    }

                }
            })
        }
        return undefined
    }, [currentUser, nav])



    function loginUser(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setTimeout(function () {
            const email = emailRef.current?.value ?? ''
            const pass = passRef.current?.value ?? ''

            if (email === '' || pass === '') {
                setErr('Email and Password and required')
                setLoading(false)
            } else {
                login(email, pass)
                    .then(() => {
                        setLoading(false)
                    }).catch((error: unknown) => {
                        const code = getErrorCode(error).replace('auth/', '') as keyof typeof AuthError
                        setErr(AuthError[code] ?? getErrorMessage(error))
                        setLoading(false)
                    });
            }
        }, 300)
    }


    return (
        <>
            {
                !isFetching ?
                    <div className='w-full h-screen  bg-linear-to-b from-zinc-200 to-white flex justify-center items-center'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='w-full sm:w-[400px] h-auto bg-white rounded-md p-10'>
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
                                            className={`p-3 border border-zinc-300 ring-1 ring-transparent outline-hidden
                                rounded-md focus:ring-sky-300 focus:border-sky-300 text-sm`}
                                        />
                                    </label>
                                )}

                                <div className='h-auto min-h-6 w-auto text-xs text-red-500
                     flex items-center justify-end font-medium p-1 mt-2'>
                                    {err}
                                </div>
                                <button
                                    type={`submit`}
                                    className={`p-2 bg-zinc-700 text-white text-sm outline-hidden border border-transparent
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
                    <div className='w-full h-screen  bg-linear-to-b from-zinc-200 to-white flex justify-center items-center'>
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </div>
            }
        </>
    )
}
