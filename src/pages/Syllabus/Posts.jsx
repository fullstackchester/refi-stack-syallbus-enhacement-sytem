import { onValue, orderByChild, orderByValue, query, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord, faSearch, faAdd } from '@fortawesome/free-solid-svg-icons'



export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [searchpost, setSearch] = useState('')

    useEffect(() => {
        onValue(ref(database, 'posts'), posts => {
            if (posts.exists() && posts.length !== 0) {
                setPosts(Object.values(posts.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-auto min-h-[600px]'>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
                <span className='text-xl flex items-center font-medium text-zinc-600 '>Posted Syllabus</span>
                <div className='h-full w-auto min-w-[20rem] border-red-600 flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent border border-zinc-200 rounded-md mr-2">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
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
                {posts && posts
                    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                        && val.includes(searchpost)))
                    .map((val, key) => {
                        return (
                            <div
                                key={key}
                                className='col-span-1 h-auto bg-white border border-gray-200 rounded-lg'>
                                <div className='h-auto border-b border-zinc-200 py-3 px-5'>
                                    <Link to={`/posts/${val.postId}`} className='text-xl text-zinc-700 font-semibold
                                     block hover:underline overflow-hidden text-ellipsis'>
                                        {val.postTitle}
                                    </Link>
                                    <span className='text-xs font-medium text-zinc-500 block'>{`Posted: ${val.postDate}`}</span>

                                </div>
                                <div className='h-40 flex items-center justify-center p-4'>
                                    <p className='h-40 flex flex-col justify-center text-zinc-800 border-black'>
                                        <FontAwesomeIcon icon={faFileWord} className='text-3xl' />
                                        <span className='text-xs text-center font-medium'>{val.postFile}</span>
                                        <br />
                                    </p>
                                </div>
                                <div className='h-12 flex justify-end border-t border-zinc-200'>
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
