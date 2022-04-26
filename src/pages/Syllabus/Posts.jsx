import { onValue, orderByChild, orderByValue, query, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord, faSearch, faAdd } from '@fortawesome/free-solid-svg-icons'
import Searchbar from '../../components/Searchbar'
import Navbar from '../../components/Navbar'
import PostStatus from '../../components/PostStatus'



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
            <Navbar
                headerTitle={`Posted Syllabus`}
                searchBarOnChange={(e) => setSearch(e.target.value)}
                buttonOnClick={(e) => {
                    e.preventDefault()
                    nav('/posts/create-post')
                }}
            />
            <main className='w-full h-auto text-lg py-5 px-10 grid grid-cols-3 gap-3'>
                {posts && posts
                    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                        && val.toLowerCase().includes(searchpost.toLowerCase())))
                    .map((val, key) => {
                        return (
                            <div
                                key={key}
                                className='col-span-1 h-auto bg-white border border-gray-200 rounded-lg'>
                                <div className='h-auto border-b border-zinc-200 py-3 px-5'>
                                    <Link to={`/posts/${val.postId}`} className='text-lg text-zinc-700 font-semibold
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
                                <div className='h-12 flex justify-end items-center border-t border-zinc-200 px-3'>
                                    <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
                                </div>
                            </div>
                        )
                    })}
            </main>
        </div>
    )
}
