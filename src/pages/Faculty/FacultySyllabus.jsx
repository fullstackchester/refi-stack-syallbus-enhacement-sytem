import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'

export default function FacultySyllabus() {

    const { uid } = useParams()
    const [posts, setPosts] = useState([])
    const nav = useNavigate()
    useEffect(() => {

        onValue(ref(database, `posts`), snapshot => {
            setPosts(Object.values(snapshot.val()))
        })
    }, [])

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 px-5'>
                <span className='h-max w-max text-sm text-zinc-600 font-semibold '>Syllabus</span>
            </div>
            <div className='h-[calc(100%-3.5rem)] overflow-y-auto overflow-x-hidden'>
                <div className='h-auto flex flex-row flex-wrap'>
                    {posts.length !== 0 ?
                        posts
                            .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                            .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                && val.toLowerCase().includes(uid.toLowerCase())))
                            .map((v, k) =>
                                <div
                                    key={k}
                                    className='h-40 w-1/4 border-y border-l p-2 hover:bg-zinc-600 cursor-pointer
                                        hover:text-white transition-colors last:border-r border-zinc-200'
                                    onClick={() => nav(`/posts/${v.postId}`)}>
                                    <span className='text-xs font-medium'>{v.postTitle}</span>
                                </div>
                            ) : <></>}
                </div>


            </div>
        </>
    )
}
