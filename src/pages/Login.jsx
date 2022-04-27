import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TextField from '../components/Inputs/TextField'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'
import Form from '../components/Form'

export default function Login() {

    const nav = useNavigate()
    const { login } = useFirebase()
    const [err, setErr] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()

    const LoginFields = [
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'johnsmith@bulsu.edu.ph',
            type: 'text',
            required: true,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            name: 'password',
            label: 'Password',
            placeholder: 'Minimum of 8 characters',
            type: 'password',
            required: true,
            onChange: (e) => setPass(e.target.value)
        },
    ]


    function loginUser(e) {
        e.preventDefault()
        login(email, pass)
            .then(() => {
                nav('/dashboard')
            }).catch((err) => {
                setErr(err.code)
            });
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-[400px] h-auto bg-white border border-zinc-100 rounded-lg shadow-md p-10'>
                <Form
                    handleSubmit={loginUser}
                    handleError={err}
                    inputFields={LoginFields}
                    headings='Login'
                    buttonTitle='Login' />

                <p className='text-zinc-500 text-sm font-medium mt-5 text-center'>Don't have an account? <span
                    onClick={(e) => {
                        e.preventDefault()
                        nav('/signup')
                    }}
                    className='text-sky-600 cursor-pointer'>Signup</span></p>
            </motion.div>
        </div>
    )
}
