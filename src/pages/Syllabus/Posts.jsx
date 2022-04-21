import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord, faSearch, faAdd } from '@fortawesome/free-solid-svg-icons'



export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = onValue(ref(database, 'posts'), posts => {
            if (posts.exists() && posts.length !== 0) {
                setPosts(Object.values(posts.val()))
            }
        })
        return fetchPosts
    }, [])

    return (
        <div className='w-full h-auto min-h-[600px]'>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
                <span className='text-xl flex items-center font-medium text-zinc-600 '>Subjects</span>
                <div className='h-full w-auto min-w-[20rem] border-red-600 flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent border border-zinc-200 rounded-md mr-2">
                        <input
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`} className={`outline-none border border-transparent bg-transparent flex-1 px-3
                            ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-200 text-sm rounded-tl-md rounded-bl-md`}
                        />
                        <button className='w-12 hover:bg-zinc-600 hover:text-white transition-colors border-l
                         border-zinc-300 text-sm hover:border-zinc-600 last:rounded-tr-md rounded-br-md'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            nav('/posts/create-post')
                        }}
                        className='w-14 hover:bg-zinc-600 hover:text-white rounded-md transition-colors'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </nav>
            <main className='w-full h-auto text-lg py-5 px-10 grid grid-cols-3 gap-3'>
                {posts && posts.map((val, key) => {
                    return (
                        <div
                            key={key}
                            className='col-span-1 h-auto bg-white border border-gray-200 mb-3 rounded-lg shadow-sm'>
                            <div className='h-auto border-b border-zinc-200 py-3 px-5'>
                                <Link to={`/posts/${val.postId}`} className='text-xl text-zinc-700 font-medium block hover:underline'>
                                    {val.postTitle}
                                </Link>
                                <span className='text-xs block'>{`Posted: ${val.postDate}`}</span>

                            </div>
                            <div className='h-40 flex items-center justify-center bg-zinc-100'>

                                <p className='h-40 flex flex-col justify-center text-zinc-800 border-black'>
                                    <FontAwesomeIcon icon={faFileWord} className='text-3xl' />
                                    <span className='text-sm'>{val.postFile}</span>
                                    <br />
                                </p>
                            </div>
                            <div className='h-12 flex justify-end'>
                                <div className='w-auto rounded-br-md flex items-center px-3 text-xs font-medium
                                 hover:underline cursor-pointer'>
                                    {val.postStatus}
                                </div>

                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}
