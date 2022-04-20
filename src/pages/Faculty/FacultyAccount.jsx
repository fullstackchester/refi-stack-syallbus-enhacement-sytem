import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'

function FacultyAccount() {

    const faculty = useParams()
    const [facultyData, setFacultyData] = useState({})

    useEffect(() => {
        const getFaculty = onValue(ref(database, 'users/' + faculty.id), snapshot => {
            if (snapshot.exists()) {
                return setFacultyData(snapshot.val())
            } else {

            }
        })
        return getFaculty
    }, [])

    return (
        <div className='w-full h-auto py-5 px-10'>

            <div className='w-full h-auto grid grid-cols-6 gap-4'>
                <main className='min-h-[500px] col-span-4 shadow-sm bg-white rounded-md flex flex-col items-center p-5'>
                    <img
                        className='h-36 w-36 border-2 border-gray-600 rounded-[100%]'
                    />
                    <h1 className='text-2xl text-gray-700 font-medium text-center'>{facultyData.name} </h1>
                    <h6 className='text-md text-gray-500 font-medium text-center'>{facultyData.userType} </h6>
                </main>
            </div>

        </div>
    )
}

export default FacultyAccount