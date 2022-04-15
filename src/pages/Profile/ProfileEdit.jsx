import React, { useState, useEffect } from 'react'
import Dropdown from '../../components/Dropdown'
import Form from '../../components/Form'
import { push, child, ref, update, get, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'

export function ProfileEdit() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [employeeId, setEmployeeId] = useState()
    const [department, setDepartment] = useState()
    const [err, setErr] = useState()
    const { currentUser } = useFirebase()
    const nav = useNavigate()

    const [currentData, setCurrentData] = useState({})
    const updates = {}

    const updateProfile = {
        uid: currentData.uid,
        department: department,
        employeeId: employeeId,
        name: name,
        email: email,
        userType: currentData.userType
    }

    useEffect(() => {
        const getCurrent = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            if (snapshot.exists()) {
                setCurrentData(snapshot.val())
            } else {
                setErr('User not found')
            }
        })

        return getCurrent
    }, [])

    const ChangeProfileFields = [
        {
            name: 'employee-id',
            label: 'Employee ID',
            placeholder: 'HIS00AA3125',
            type: 'text',
            required: true,
            onChange: (e) => setEmployeeId(e.target.value),
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'John Smith',
            type: 'text',
            required: true,
            onChange: (e) => setName(e.target.value),
        },
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'johnsmith@bulsu.edu.ph',
            type: 'text',
            required: true,
            onChange: (e) => setEmail(e.target.value)
        },
    ]

    const departmentOptions = [
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
    ]


    const SaveChanges = (e) => {
        e.preventDefault()

        updates['users/' + currentUser.uid + '/'] = updateProfile
        update(ref(database), updates)
            .then(() => {
                nav('/profile')
            }).catch(() => {
                alert("Profile not updated")
            });

        console.log(updateProfile)
    }



    return (
        <main className='h-[600px] p-4 flex items-center justify-center'>
            <div className='w-[450px] h-auto '>
                <Form
                    buttonTitle='Save changes'
                    inputFields={ChangeProfileFields}
                    handleSubmit={SaveChanges}
                    handleError={err}
                    children={<Dropdown
                        name='department'
                        label='Department'
                        required={true}
                        selectables={departmentOptions}
                        onChange={(e) => {
                            setDepartment(e.target.value)
                        }} />} />
            </div>

        </main>
    )
}
