import React, { useState } from 'react'
import Form from '../../components/Form'

export function ProfileEdit() {



    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmPass, setconfirmPass] = useState()
    const [err, setErr] = useState()
    const changes = {
        displayName: name,
        email: email,
    }

    const ChangeProfileFields = [
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
            placeholder: 'Enter password to verify changes',
            type: 'password',
            required: true,
            onChange: (e) => setconfirmPass(e.target.value)
        },
    ]


    const SaveChanges = (e) => {
        e.preventDefault()
        setErr('Sample error')
    }



    return (
        <main className='h-[600px] p-4 flex items-center justify-center'>
            <div className='w-[450px] h-auto '>
                <Form
                    headings='Edit profile'
                    buttonTitle='Save changes'
                    inputFields={ChangeProfileFields}
                    handleSubmit={SaveChanges}
                    handleError={err} />
            </div>

        </main>
    )
}
