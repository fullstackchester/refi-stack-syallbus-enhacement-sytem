import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'

function FacultyAccount() {

    const faculty = useParams()
    const [facultyData, setFacultyData] = useState({})

    useEffect(() => {
        const getFaculty = onValue(ref(database, 'users/' + faculty.id), snapshot => {
            if (snapshot.exists()){
                return setFacultyData(snapshot.val())
            } else {
                
            }
        })
        return getFaculty
    }, [])

    return (
        <div className='w-full h-auto min-h-[600px] p-4'>

            <div className='w-full h-[600px] grid grid-cols-4 gap-4'>
                <main className='col-span-3 shadow-sm bg-white rounded-lg flex flex-col'>
                    <div className='h-60 flex justify-center p-2'>
                        <img className='h-56 w-56 border-2 rounded-[100%] bg-zinc-200' />
                    </div>
                    <h1 className='text-2xl text-zinc-700 font-semibold text-center p-1'>{facultyData.name}</h1>
                    <h4 className='text-md text-zinc-500 font-medium text-center'>{facultyData.email}</h4>

                </main>
                <aside className='border border-pink-600 col-span-1'>

                </aside>
            </div>

        </div>
    )
}

export default FacultyAccount