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
        <div className='w-full h-auto py-5 px-10 flex justify-center'>

            <div className='w-[80%] h-auto min-h-[600px] bg-white rounded-md shadow-sm border border-zinc-200'>

            </div>

        </div>
    )
}

export default FacultyAccount