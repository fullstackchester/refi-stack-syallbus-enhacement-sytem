import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import Navbar from '../../components/Navbar'
import PostStatus from '../../components/PostStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faFilter } from '@fortawesome/free-solid-svg-icons'




export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [schoolyear, setSy] = useState([])
    const [searchpost, setSearch] = useState('')
    const [isExpand, setExpand] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'posts'), posts => {
            if (posts.exists() && posts.length !== 0) {
                setPosts(Object.values(posts.val()))
            }
        })

        onValue(ref(database, 'schoolYear'), sy => {
            if (sy.exists()) {
                setSy(Object.values(sy.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-auto min-h-[600px]'>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
                <span className='text-lg flex items-center font-medium text-zinc-600 '>{'Posted Syllabus'}</span>
                <div className='h-full w-auto min-w-[20rem] flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent mr-2">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`}
                            className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all 
                        ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-xs rounded-md`}
                        />
                    </div>
                    <button
                        title='New post'
                        className='w-12 hover:bg-zinc-600 hover:text-white rounded-md transition-colors
                         hover:shadow-lg border border-zinc-200 mr-2'>
                        <FontAwesomeIcon icon={faFilter} size={'sm'} />
                    </button>
                    <button
                        onClick={() => nav('/posts/create-post')}
                        title='New post'
                        className='w-12 hover:bg-zinc-600 hover:text-white rounded-md transition-colors hover:shadow-lg
                    border border-zinc-200'>
                        <FontAwesomeIcon icon={faAdd} size={'sm'} />
                    </button>
                </div>
            </nav>
            <main className='w-full h-auto text-lg py-5 px-10 grid grid-cols-4 gap-3'>
                {posts && posts
                    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                        && val.toLowerCase().includes(searchpost.toLowerCase())))
                    .map((val, key) => {
                        return (
                            <div
                                key={key}
                                className='col-span-1 h-auto min-h-[200px] bg-white border
                                 border-gray-200 rounded-lg flex flex-col'>
                                <div className='h-auto py-3 px-5 flex-1'>
                                    <Link to={`/posts/${val.postId}`} className='text-base text-zinc-700 font-semibold 
                                    block hover:underline overflow-hidden text-ellipsis'>
                                        {val.postTitle}
                                    </Link>
                                    <span className='text-xs font-medium text-zinc-500 block'>{`Posted: ${val.postDate}`}</span>
                                </div>
                                <div className='h-12 flex justify-end items-center px-3'>
                                    <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
                                </div>
                            </div>
                        )
                    })}
            </main>
        </div>
    )
}


// {posts && posts
//     .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
//     .filter(entry => Object.values(entry).some(val => typeof val === 'string'
//         && val.toLowerCase().includes(searchpost.toLowerCase())))
//     .map((val, key) => {
//         return (
//             <div
//                 key={key}
//                 className='col-span-1 h-auto min-h-[250px] bg-white border border-gray-200 rounded-lg
//                 flex flex-col'>
//                 <div className='h-auto py-3 px-5 flex-1'>
//                     <Link to={`/posts/${val.postId}`} className='text-lg text-zinc-700 font-semibold
//                      block hover:underline overflow-hidden text-ellipsis'>
//                         {val.postTitle}
//                     </Link>
//                     <span className='text-xs font-medium text-zinc-500 block'>{`Posted: ${val.postDate}`}</span>
//                 </div>
//                 <div className='h-12 flex justify-end items-center px-3'>
//                     <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
//                 </div>
//             </div>
//         )
//     })}