import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TextField from '../components/Inputs/TextField'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../js/Firebase'
import Form from '../components/Form'

function Signup() {

    const nav = useNavigate()
    const [err, setErr] = useState()
    const [emplyeeId, setemplyeeId] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
    const [passConf, setpassConf] = useState()
    const { signup, writeData } = useFirebase()


    function signupAdmin(e) {
        e.preventDefault()
        if (pass === passConf) {

            signup(email, pass)
                .then((currentuser) => {
                    // if successfully added user to auth, write the data to realtime
                    const user = {
                        uid: currentuser.user.uid,
                        name: name,
                        userType: 'faculty',
                        email: email
                    }
                    writeData('users/', user, currentuser.user.uid)
                        .then(() => {
                            nav('/dashboard')
                        }).catch((err) => {
                            setErr(err.code)
                        });

                }).catch((err) => {
                    // if failed, catch error and display to alert dialog
                    setErr(err.code)
                });
        } else {
            setErr('Passwords dont match')
        }
    }

    const SignupFields = [
        {
            name: 'employee-id',
            label: 'Employee ID',
            placeholder: 'HIS00AA3125',
            type: 'text',
            required: true,
            onChange: (e) => setemplyeeId(e.target.value)
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'John Smith',
            type: 'text',
            required: true,
            onChange: (e) => setName(e.target.value)
        },
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
        {
            name: 'confirm-password',
            label: 'Confirm password',
            placeholder: 'Retype password',
            type: 'password',
            required: true,
            onChange: (e) => setpassConf(e.target.value)
        },
    ]

    return (
        <div className='w-full min-h-screen h-auto flex justify-center items-center p-10'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-[500px] h-auto bg-white border border-zinc-100 rounded-lg shadow-md p-10'>

                <Form
                    handleSubmit={signupAdmin}
                    handleError={err}
                    inputFields={SignupFields}
                    headings='Signup'
                    buttonTitle='Create account'
                />
                <p className='text-zinc-500 text-sm font-medium mt-5 text-center'>Already have an account? <span
                    onClick={(e) => {
                        e.preventDefault()
                        nav('/')
                    }}
                    className='text-sky-600 cursor-pointer'>Login</span></p>
            </motion.div>
        </div>
    )
}

export default Signup