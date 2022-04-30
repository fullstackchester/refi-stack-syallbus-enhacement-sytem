import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
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
                                className='col-span-1 h-auto min-h-[250px] bg-white border border-gray-200 rounded-lg
                                flex flex-col'>
                                <div className='h-auto py-3 px-5 flex-1'>
                                    <Link to={`/posts/${val.postId}`} className='text-lg text-zinc-700 font-semibold
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
