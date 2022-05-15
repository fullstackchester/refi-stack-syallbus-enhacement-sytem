import React, { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faPlusCircle, faFilter, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

function Subjects() {

    const nav = useNavigate()
    const [search, setSearch] = useState('')
    const [subject, setSubject] = useState([])


    useEffect(() => {

        return onValue(ref(database, 'subject'), snapshot => {
            if (snapshot.exists()) {
                setSubject(Object.values(snapshot.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center py-5'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-end px-5 items-center'>
                    <div>
                        <input
                            type='text'
                            spellCheck={false}
                            placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-60 border border-zinc-200 text-xs p-2 outline-none rounded-md' />

                    </div>
                    {
                        [
                            {
                                icon: faPlusCircle,
                                title: 'New subject',
                                onClick: () => nav('/subjects/add')
                            },
                        ].map((v, k) =>
                            <button
                                key={k}
                                title={v.title}
                                className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                                onClick={v.onClick} >
                                <FontAwesomeIcon icon={v.icon} size='sm' />
                            </button>)}
                </header>
                <main className='flex-1'>
                    <table className='w-full h-auto table-auto'>
                        <thead>
                            <tr className='border border-zinc-100'>
                                {
                                    [
                                        { title: '', },
                                        { title: 'Course Code', },
                                        { title: 'Course Title', },
                                        { title: 'Units', },
                                    ].map((val, key) =>
                                        <th key={key}
                                            className='p-2 text-xs text-left text-zinc-600 hover:bg-zinc-200
                                                 transition-colors cursor-pointer'>
                                            {val.title}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subject.length !== 0 ?
                                    subject
                                        .sort((a, b) => {
                                            a.courseCode.toLowerCase().localeCompare(b.courseCode.toLowerCase())
                                        })
                                        .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                            && val.toLowerCase().includes(search.toLowerCase())))
                                        .map((v, k) =>
                                            <tr key={k}
                                                className='border border-zinc-100 text-xs text-zinc-700 font-medium 
                                                hover:bg-zinc-200 transition-colors'>
                                                <td className='p-3'>
                                                    {/* Place the Checkbox here */}
                                                    <input type='checkbox' className=' default:ring-2 checked:bg-sky-300' />
                                                </td>
                                                <td className='p-3 cursor-pointer hover:underline'
                                                    onClick={() => nav(`/subjects/${v.subjectId}`)}> {v.courseCode} </td>
                                                <td className='p-3'> {v.subjectTitle} </td>
                                                <td className='p-3'> {v.creditUnits} </td>
                                            </tr>) : <></>
                            }
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    )
}

export default Subjects