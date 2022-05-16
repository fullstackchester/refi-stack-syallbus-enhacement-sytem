import React, { useRef, useState, useEffect } from 'react'
import { orderByValue, equalTo, onValue, query, ref } from 'firebase/database'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import PopFilter from '../../components/PopFilter'
import PostChart from './PostChart'
import UserChart from './UserChart'
import SubjectChart from './SubjectChart'

function Dashboard() {
    const [AY, setAY] = useState([])

    useEffect(() => {
        onValue(ref(database, 'schoolYear'), snapshot => {
            if (snapshot.exists()) {
                setAY(Object.values(snapshot.val()))
            }
        })
    }, [])


    return (
        <div className='w-full h-[calc(100vh-3rem)] flex flex-col items-center py-5'>
            <div className='grid grid-cols-6 gap-4 h-auto w-[85%]'>
                <PostChart />
                <UserChart />
                <SubjectChart />
                <div className='col-span-6 h-80 bg-white rounded-md flex flex-col'>
                    <div className='h-10'>

                    </div>
                    <table>
                        <thead>
                            <tr className='border border-zinc-100'>
                                {
                                    [
                                        { title: <input type='checkbox' /> },
                                        { title: 'School Year' },
                                        { title: 'Start Date' },
                                        { title: 'End Date' },
                                        { title: 'Status' }
                                    ].map((v, k) =>
                                        <th key={k}
                                            className='text-xs text-zinc-600 p-3 text-left'>
                                            {v.title}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AY && AY.map((v, k) =>
                                    <tr key={k}>
                                        <td className='text-xs text-zinc-600 p-3'></td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syTitle}</td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syStart}</td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syEnd}</td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syStatus}</td>
                                    </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

    )
}

export default Dashboard