import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database } from '../../js/Firebase'

export default function Information() {

    const { postId } = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        return onValue(ref(database, `/posts/${postId}`), snapshot => {
            if (snapshot.exists()) {
                setPost(snapshot.val())
            }
        })
    }, [])


    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>Post Information</div>
            <div className='flex-1 px-5 py-3 overflow-y-auto'>
                <div className='flex flex-row items-center justify-between'>
                    <span className='text-lg text-zinc-700 font-semibold'>{post.postTitle}</span>
                    <PostStatus postStatus={post.postStatus} textSize={'text-xs'} />
                </div>
            </div>
        </>
    )
}
