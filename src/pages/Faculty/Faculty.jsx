import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"


function Faculty() {

    const [faculty, setFaculty] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSort] = useState('name')
    const nav = useNavigate()

    useEffect(() => {

        const getFaculty = onValue(ref(database, 'users'), snapshot => {
            return setFaculty(Object.values(snapshot.val()))
        })

        return getFaculty
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

                </header>
                <main className='flex-1 overflow-y-auto'>
                    <table className='w-full h-auto table-auto'>
                        <thead className='sticky top-0 bg-white'>
                            <tr className='border border-zinc-100'>
                                {
                                    [{ title: '' },
                                    { title: 'Name', onClick: () => setSort('name') },
                                    { title: 'Email', onClick: () => setSort('email') },
                                    { title: 'Employee Id', onClick: () => setSort('employeeId') },
                                    { title: 'Department', onClick: () => setSort('department') },]
                                        .map((val, key) =>
                                            <th
                                                key={key}
                                                onClick={val.onClick}
                                                className='p-2 text-xs text-left text-zinc-600 hover:bg-zinc-200
                                                 transition-colors cursor-pointer'>
                                                {val.title}
                                            </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {faculty.length !== 0 ?
                                faculty
                                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                        && val.toLowerCase().includes(search.toLowerCase())))
                                    .sort((a, b) => {
                                        if (sortBy === 'name') {
                                            return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                                        } else if (sortBy === 'email') {
                                            return a.email.toLowerCase().localeCompare(b.email.toLowerCase())
                                        } else if (sortBy === 'employeeId') {
                                            return a.employeeId.toLowerCase().localeCompare(b.employeeId.toLowerCase())
                                        } else if (sortBy === 'department') {
                                            return a.department.toLowerCase().localeCompare(b.department.toLowerCase())
                                        }
                                    })
                                    .map((val, key) =>
                                        <motion.tr
                                            key={key}
                                            animate={{ x: 0 }}
                                            className='border border-zinc-100 text-xs text-zinc-700 font-medium
                                        hover:bg-zinc-200 transition-colors'>
                                            <td className='px-2 py-3'>
                                                {/* Place the Checkbox here */}
                                                <input type='checkbox' className=' default:ring-2 checked:bg-sky-300' />
                                            </td>
                                            <td className='px-2 py-3'>
                                                <Link to={`${val.uid}`} className='hover:underline'>
                                                    {val.name}
                                                </Link>
                                            </td>
                                            <td className='px-2 py-3'>{val.email}</td>
                                            <td>{val.employeeId}</td>
                                            <td className='px-2 py-3'>{val.department}</td>
                                        </motion.tr>) : <></>}
                        </tbody>
                    </table>
                </main>
                <footer className='h-10 border-t border-zinc-100'>

                </footer>
            </div>
        </div>
    )
}

export default Faculty