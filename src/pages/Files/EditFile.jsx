import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'

export default function EditFile() {
    const postId = useParams()
    const [post, setPost] = useState({})
    useEffect(() => {
        return onValue(ref(database, `posts/${postId.id}`), post => {
            if (post.exists()) {
                setPost(post.val())
            }
        })
    }, [])
    return (
        <div className='w-full h-auto flex justify-center items-center py-5 px-10'>
            <main className='w-[80%] h-auto min-h-[85vh] bg-white rounded-md border border-zinc-200 flex flex-col'>
                {post.postId}
                {post.postTitle}
            </main>
        </div>
    )
}
