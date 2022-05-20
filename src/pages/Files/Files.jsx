import { equalTo, onValue, query, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database, storage } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faDownload } from '@fortawesome/free-solid-svg-icons'

import { getDownloadURL, ref as storageRef } from 'firebase/storage'

export default function Files() {

    const [files, setFiles] = useState([])
    const { currentUser } = useFirebase()
    const [search, setSearch] = useState('')
    const [sortBy, setSort] = useState('postDate')

    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])


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

    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(myFiles.map(item => item.postFileUrl))
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

    files.forEach(function (file) {
        if (file.uid === uid) {
            myFiles.push(file)
        }
    });

    console.table(isCheck)

    function downloadFiles(e) {
        e.preventDefault()
        isCheck.map(fileUrl => {
            getDownloadURL(storageRef(storage, fileUrl))
                .then((url) => {
                    // console.log(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`)
                    window.open(url)
                })
                .catch((e) => {
                    console.log(e)
                });
        })
    }


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
                    {myFiles.length !== 0 ?
                        <table className='w-full h-auto table-auto border border-red-600'>
                            <thead className='sticky top-0 bg-white'>
                                <tr className='border border-zinc-100'>
                                    {
                                        [
                                            {
                                                title: <input type='checkbox'
                                                    onChange={handleCheckAll}
                                                    checked={isCheckAll} />
                                            },
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
                                            <td className='p-3'>
                                                <input
                                                    type='checkbox'
                                                    id={v.postId}
                                                    onChange={handleCheck}
                                                    checked={isCheck.includes(v.postFileUrl)}
                                                    value={v.postFileUrl}
                                                />
                                            </td>
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
                        :
                        <div className='h-full w-full grid place-items-center place-content-center'>
                            <span className='text-2xl text-zinc-600 font-semibold'>No Files Found</span>
                            <button
                                onClick={() => nav('/files/create-post')}
                                className='flex flex-row text-xs text-zinc-600 font-medium py-1 px-2 
                                border border-zinc-200 rounded-md outline-none hover:bg-zinc-200
                                 transition-colors'>Add Files</button>

                        </div>}
                </main>
                <footer className='h-12 border-t border-zinc-100 flex items-center p-3'>
                    {isCheck.length !== 0 &&
                        <button
                            onClick={downloadFiles}
                            type='button'
                            className='p-1 h-auto w-auto border border-transparent rounded-md
                         text-white bg-sky-600 hover:bg-sky-700 flex flex-row items-center justify-evenly' >
                            <span className='text-xs mr-1'>Download</span>
                            <FontAwesomeIcon icon={faDownload} size='xs' />
                        </button>}
                </footer>
            </div>
        </div>
    )
}   