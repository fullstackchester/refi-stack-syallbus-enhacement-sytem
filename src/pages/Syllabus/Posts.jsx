import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord } from '@fortawesome/free-solid-svg-icons'



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
        <div className='w-full h-auto min-h-[600px] border-red-600 flex flex-row'>
            <main className='w-3/4 h-auto  text-lg py-5 px-10 flex flex-col items-center'>
                {posts && posts.map((val, key) => {
                    return (
                        <div
                            key={key}
                            className='w-[80%] h-auto bg-white border border-gray-200 mb-3 rounded-lg shadow-sm'>
                            <div className='h-auto border-b border-zinc-200 py-3 px-5'>
                                <Link to={`/posts/${val.postId}`} className='text-xl text-zinc-700 font-medium block hover:underline'>{val.postTitle}</Link>
                                <span className='text-xs block'>{`Posted: ${val.postDate} | ${val.postStatus}`}</span>
                                
                            </div>
                            <div className='h-80 flex items-center justify-center bg-zinc-100'>

                                <p className='h-40 flex flex-col justify-center text-zinc-800 border-black'>
                                    <FontAwesomeIcon icon={faFileWord} className='text-6xl' />
                                    <span className='text-sm'>{val.postFile}</span>
                                    <br />


                                </p>
                            </div>
                            <div className='h-14'>

                            </div>
                        </div>
                    )
                })}
            </main>
            <aside className='w-1/4 h-[calc(100vh-3rem)] bg-white border-l border-zinc-200 sticky top-12 flex flex-col'>
                <div className='h-40 border-b border-zinc-300'>
                    <button
                        onClick={() => nav('/posts/create-post')}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 
                        bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none 
                        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-3">Create post</button>
                </div>
            </aside>
        </div>
    )
}
