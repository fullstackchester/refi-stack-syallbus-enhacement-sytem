import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import Navbar from '../../components/Navbar'
import PostStatus from '../../components/PostStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faPlusCircle, faFilter, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import PopFilter from '../../components/PopFilter'




export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [ay, setAy] = useState([])
    const [searchpost, setSearch] = useState('')
    const [isExpand, setExpand] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [filterSy, setFilterSy] = useState(false)
    const [isAllSelected, setSelectedAll] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'posts'), posts => {
            if (posts.exists() && posts.length !== 0) {
                setPosts(Object.values(posts.val()))
            }
        })

        onValue(ref(database, 'schoolYear'), sy => {
            if (sy.exists()) {
                setAy(Object.values(sy.val()))
            }
        })
    }, [])

    function getSy(syId) {
        onValue(ref(database, `schoolYear/${syId}`), snapshot => {
            if (snapshot.exists()) {

                return (<span>{snapshot.val().syTitle}</span>)
            } else {
                return 'No Sy Found'
            }
        })
    }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <PopFilter isOpen={isOpen} handleClose={() => setOpen(false)} buttonTitle='Ok' dialogTitle='Filter by' >
                <div className='flex flex-col'>
                    {
                        [
                            {
                                id: 'Needs Reviewing',
                                label: 'Needs Reviewing',
                                value: 'Needs Reviewing',
                                select: '',
                            },
                            {
                                id: 'Needs Revisions',
                                label: 'Needs Revisions',
                                value: 'Needs Revisions'
                            },
                            {
                                id: 'Approved',
                                label: 'Approved',
                                value: 'Approved'
                            },
                            {
                                id: 'null',
                                label: 'None',
                                value: ''
                            },
                        ]
                            .map((val, key) =>
                                <label key={key} htmlFor={val.id} className='text-sm flex flex-row items-center p-2 hover:bg-zinc-200'>
                                    <input name='filterBy' id={val.id} type='radio' value={val.value}
                                        onChange={() => {
                                            setSearch(val.value)
                                            setOpen(false)
                                        }} />
                                    <span className='ml-2'>{val.label}</span>
                                </label>)
                    }
                </div>
            </PopFilter>
            <PopFilter isOpen={filterSy} handleClose={() => setFilterSy(false)} buttonTitle='Ok' dialogTitle='Select School Year' >
                <div className='flex flex-col'>
                    {
                        ay.map((val, key) =>
                            <label key={key} htmlFor={val.syId} className='text-sm flex flex-row items-center p-2 hover:bg-zinc-200'>
                                <input name='filterBy' id={val.syId} type='radio' value={val.syId}
                                    onChange={() => {
                                        setSearch(val.syId)
                                        setFilterSy(false)
                                    }} />
                                <span className='ml-2'>{val.syTitle}</span>
                            </label>)
                    }
                </div>
            </PopFilter>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-end px-5 items-center'>
                    <div className='h-full flex flex-row items-center justify-center'>
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
                                title: 'New post',
                                onClick: () => nav('create-post')
                            },
                            {
                                icon: faFilter,
                                title: 'Sort By',
                                onClick: () => setOpen(true)
                            },
                            {
                                icon: faCalendarAlt,
                                title: 'Sort by School Year',
                                onClick: () => setFilterSy(true)
                            },
                        ].map((val, key) =>
                            <button
                                key={key}
                                title={val.title}
                                className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                                onClick={val.onClick} >
                                <FontAwesomeIcon icon={val.icon} size='sm' />
                            </button>)
                    }
                </header>
                <main className='flex-1 overflow-y-auto'>
                    <table className='w-full h-auto table-auto'>
                        <thead className='sticky top-0 bg-white'>
                            <tr className='border border-zinc-100'>
                                {[
                                    { title: <input type='checkbox' onChange={() => setSelectedAll(true)} /> },
                                    { title: 'Post Title' },
                                    { title: 'Academic Year' },
                                    { title: 'Date Posted' },
                                    { title: 'Status' }
                                ].map((val, key) =>
                                    <th key={key} className='p-2 text-xs text-left text-zinc-600'>{val.title}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts
                                .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                    && val.toLowerCase().includes(searchpost.toLowerCase())))
                                .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                .map((v, k) =>
                                    <tr key={k}
                                        className='text-xs font-medium hover:bg-zinc-200
                                         transition-colors border border-zinc-100 text-zinc-700' >
                                        <td className='p-2 text-xs '>
                                            <input type='checkbox' />
                                        </td>
                                        <td className='p-2 text-xs  hover:underline cursor-pointer'
                                            onClick={() => {
                                                nav(`/posts/${v.postId}`)
                                            }}>{v.postTitle}</td>
                                        <td className='p-2 text-xs '>{v.syId ? `${getSy(v.syId)}` : 'Null'}</td>
                                        <td className='p-2 text-xs '>{v.postDate}</td>
                                        <td className='p-2 text-xs '>
                                            <PostStatus postStatus={v.postStatus} textSize={'text-xs'} />
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


// {posts && posts
//     .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
    // .filter(entry => Object.values(entry).some(val => typeof val === 'string'
    //     && val.toLowerCase().includes(searchpost.toLowerCase())))
//     .map((val, key) =>
//         <Link to={`/posts/${val.postId}`}>
//             <div
//                 key={key}
//                 className='col-span-1 h-auto min-h-[200px] bg-white border
//                  border-gray-200 rounded-md hover:shadow-lg flex flex-col'>
//                 <div className='h-auto py-3 px-5 flex-1'>
//                     <Link to={`/posts/${val.postId}`} className='text-base text-zinc-700 font-semibold 
//                     block hover:underline overflow-hidden text-ellipsis'>
//                         {val.postTitle}
//                     </Link>
//                     <span className='text-xs font-medium text-zinc-500 block'>{`Posted: ${val.postDate}`}</span>
//                 </div>
//                 <div className='h-12 flex justify-end items-center px-3'>
//                     <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
//                 </div>
//             </div>
//         </Link>
//     )}