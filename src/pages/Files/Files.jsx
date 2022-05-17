import { equalTo, onValue, query, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

export default function Files() {

    const [files, setFiles] = useState([])
    const { currentUser } = useFirebase()
    const [search, setSearch] = useState('')
    const [sortBy, setSort] = useState('postDate')

    const uid = currentUser.uid
    const nav = useNavigate()

    let myFiles = []

    useEffect(() => {

        return onValue(ref(database, `posts`), snapshot => {
            if (snapshot.exists()) {
                setFiles(Object.values(snapshot.val()))
            }
        })
    }, [])

    files.forEach(function (file) {
        if (file.uid === uid) {
            myFiles.push(file)
        }
    });


    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-end px-5 items-center'>
                    <div className='h-full flex flex-row items-center justify-center'>
                        <input
                            type='search'
                            spellCheck={false}
                            placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-60 border border-zinc-200 text-xs p-2 outline-none rounded-md' />
                    </div>
                    <button
                        title='New post'
                        className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                        onClick={() => nav('/files/create-post')} >
                        <FontAwesomeIcon icon={faPlusCircle} size='sm' />
                    </button>
                </header>
                <main className='flex-1 overflow-y-auto'>
                    <table className='w-full h-auto table-auto'>
                        <thead className='sticky top-0 bg-white'>
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
                            {myFiles.filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                && val.toLowerCase().includes(search.toLowerCase())))
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
                                        <td className='p-3'>
                                            <PostStatus postStatus={v.postStatus} textSize='text-xs' />
                                        </td>
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