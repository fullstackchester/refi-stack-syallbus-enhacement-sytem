import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../js/Firebase'

function Faculty() {

    const [faculty, setFaculty] = useState([])

    useEffect(() => {
        
        const getFaculty = onValue(ref(database, 'users'), snapshot => {
            return setFaculty(Object.values(snapshot.val()))
        })

        return getFaculty
    }, [])


    console.log(faculty)

    return (
        <div className='w-full h-screen border'>
            <nav className='h-12 border-b border-zinc-200'></nav>
            <main className='h-auto p-4 grid grid-cols-4 gap-2'>
                {faculty && faculty.map((val, key) => {
                    return (
                        <div key={key} className='col-span-1 h-36 border border-zinc-200 p-4 flex flex-col'>
                            {val.name}
                            <br></br>
                            {val.userType}
                        </div>
                    )
                })}
            </main>

        </div>
    )
}

export default Faculty