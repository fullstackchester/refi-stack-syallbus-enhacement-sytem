import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useFirebase } from '../../js/FirebaseContext'
import Loading from '../../components/Loading'


function Faculty() {

    const [faculty, setFaculty] = useState([])
    const [search, setSearch] = useState('')
    const [sortBy, setSort] = useState('name')
    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])
    const { role, currentUser } = useFirebase()
    const [dept, setDept] = useState()

    const [isFetching, setFetching] = useState(true)

    let filtered = []

    const nav = useNavigate()

    useEffect(() => {
        setTimeout(function () {
            onValue(ref(database, `users/${currentUser.uid}`), snap => {
                if (snap.exists()) {
                    setDept(snap.val().department)
                }
            })
            onValue(ref(database, 'users'), snapshot => {
                setFaculty(Object.values(snapshot.val()))
            })
            setFetching(false)
        }, 500)
    }, [])

    if (role === 'area chair') {
        faculty.forEach(user => {
            if (user.department === dept) {
                filtered.push(user)
            }
        })
    } else {
        faculty.forEach(user => {
            filtered.push(user)
        })
    }

    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(faculty.map(item => item.uid))
        if (isCheckAll) {
            setCheck([])
        }
    }

    function handleCheck(e) {
        const { checked, value } = e.target
        setCheck([...isCheck, value])
        if (!checked) {
            setCheck(isCheck.filter(item => item !== value))
        }
    }

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
                {!isFetching ?
                    <main className='flex-1 overflow-y-auto'>
                        <table className='w-full h-auto table-auto'>
                            <thead className='sticky top-0 bg-white'>
                                <tr className='border border-zinc-100'>
                                    {
                                        [{
                                            title: <input
                                                type='checkbox'
                                                onChange={handleCheckAll}
                                                checked={isCheckAll}
                                            />
                                        },
                                        { title: 'Name', onClick: () => setSort('name'), hover: 'Sort by Name' },
                                        { title: 'Email', onClick: () => setSort('email'), hover: 'Sort by Email' },
                                        { title: 'Employee Id', onClick: () => setSort('employeeId'), hover: 'Sort by Id' },
                                        { title: 'Department', onClick: () => setSort('department'), hover: 'Sort by Department' },]
                                            .map((val, key) =>
                                                <th
                                                    key={key}
                                                    onClick={val.onClick}
                                                    title={val.hover}
                                                    className='p-2 text-xs text-left text-zinc-600 hover:bg-zinc-200
                                                 transition-colors cursor-pointer'>
                                                    {val.title}
                                                </th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length !== 0 ?
                                    filtered
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
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className='border border-zinc-100 text-xs text-zinc-700 font-medium
                                        hover:bg-zinc-200 transition-colors'>
                                                <td className='px-2 py-3'>
                                                    {/* Place the Checkbox here */}
                                                    <input
                                                        type='checkbox'
                                                        onChange={handleCheck}
                                                        checked={isCheck.includes(val.uid)}
                                                        value={val.uid} />
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
                    :
                    <Loading />
                }

                <footer className='h-10 border-t border-zinc-100'>

                </footer>
            </div>
        </div>
    )
}

export default Faculty