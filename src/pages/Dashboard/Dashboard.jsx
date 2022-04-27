import { onValue, ref } from 'firebase/database'
import React, { useRef, useState, useEffect } from 'react'
import { database } from '../../js/Firebase'


function Dashboard() {

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState([])

    useEffect(() => {
        return onValue(ref(database, `users`), posts => setPost(Object.values(posts.val())))
    }, [])
    return (
        <div className='w-full h-[600px] border border-red-600 flex justify-center items-center'>
            <div className={`base-container`}>
                <table className='table border-collapse border border-zinc-600 bg-white text-sm text-zinc-800'>
                    <thead className='bg-zinc-700 text-white'>
                        <tr>
                            <th className='border border-white'>User id</th>
                            <th className='border border-white'>Name</th>
                            <th className='border border-white'>Department</th>
                            <th className='border border-white'>Account type</th>
                            <th className='border border-white'>Email</th>
                        </tr>

                    </thead>
                    <tbody>
                        {post.map((val, key) =>

                            <tr key={key}>
                                <td className='border border-zinc-600 p-3'>{val.employeeId}</td>
                                <td className='border border-zinc-600 p-3'>{val.name}</td>
                                <td className='border border-zinc-600 p-3'>{val.department}</td>
                                <td className='border border-zinc-600 p-3'>{val.userType}</td>
                                <td className='border border-zinc-600 p-3'>{val.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button className={`btn-loading`}>
                    Sample
                </button>
            </div>
        </div>

    )
}

export default Dashboard