import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'

export default function Files() {

    const [files, setFiles] = useState([])
    const { currentUser } = useFirebase()
    const uid = currentUser.uid

    const nav = useNavigate()


    useEffect(() => {
        return onValue(ref(database, `posts`), snapshot => {
            if (snapshot.exists()) {
                setFiles(Object.values(snapshot.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-end px-5 items-center'>

                </header>
                <main className='flex-1'>
                    <table className='w-full h-auto border-collapse'>
                        <thead>
                            <tr className='border border-zinc-100'>
                                {
                                    [
                                        { title: <input type='checkbox' /> },
                                        { title: 'Post Title' },
                                        { title: 'Academic Year' },
                                        { title: 'Date Posted' },
                                        { title: 'Status' }
                                    ].map((v, k) =>
                                        <th
                                            key={k}
                                            className='p-3 text-xs font-medium text-left text-zinc-600'>
                                            {v.title}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {files
                                .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                    && val.toLowerCase().includes(uid.toLowerCase())))
                                .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                .map((v, k) =>
                                    <tr key={k} className='text-xs font-medium hover:bg-zinc-200 
                                transition-colors border border-zinc-100 text-zinc-700'>
                                        <td className='p-3'><input type='checkbox' /></td>
                                        <td className='p-3'>
                                            <span
                                                className='hover:underline cursor-pointer'
                                                onClick={() => nav(`/files/${v.postId}/information`)}>{v.postTitle}</span>
                                        </td>
                                        <td className='p-3'>{ }</td>
                                        <td className='p-3'>{v.postDate}</td>
                                        <td className='p-3'>{v.postStatus}</td>
                                    </tr>)}
                        </tbody>

                    </table>

                </main>
                <footer className='h-10 border-t border-zinc-100'>

                </footer>
            </div>

        </div>
    )
}   