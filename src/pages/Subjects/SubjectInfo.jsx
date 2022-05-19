import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'

export default function SubjectInfo() {

    const { id } = useParams()
    const [subject, setSubject] = useState({})

    useEffect(() => {
        return onValue(ref(database, `subject/${id}`), snap => {
            if (snap.exists()) {
                setSubject(snap.val())
            }
        })
    }, [])
    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                Information
            </div>
            <div className='flex-1 p-5 overflow-y-auto'>
                <div className='text-zinc-700 text-2xl font-semibold'>{`Subject Code: ${subject.courseCode}`}</div>
                <div className='text-zinc-700 text-sm font-medium'>{`Subject Title: ${subject.subjectTitle}`}</div>
                <div className='text-zinc-700 text-sm font-medium'>{`Credit Units: ${subject.creditUnits}`}</div>
                <div className='text-zinc-700 text-sm text-justify mt-5'>{subject.subjectDescription}</div>
            </div>
            <div className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>

            </div>
        </>
    )
}
