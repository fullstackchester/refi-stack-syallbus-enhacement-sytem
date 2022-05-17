import React, { useState, useEffect } from 'react'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'



export default function SubjectChart() {

    const [subCount, setCount] = useState(0)

    useEffect(() => {
        return onValue(ref(database, `subject`), snap => {
            if (snap.exists()) {
                setCount(Object.values(snap.val()).length)
            }
        })
    }, [])




    return (
        <div className=' col-span-2 row-span-1 bg-white rounded-md flex flex-col'>
            <div className='p-3 flex justify-between text-zinc-500'>
                <span className='text-sm font-semibold '>Subjects</span>
                <FontAwesomeIcon icon={faBook} size='sm' />
            </div>
            <div className='flex-1 w-full flex flex-col'>
                <div className='h-20 grid place-items-center'>
                    <span className='text-4xl text-zinc-700 font-semibold'>{subCount}</span>
                </div>
            </div>
            <div className='h-10'>

            </div>
        </div>
    )
}
