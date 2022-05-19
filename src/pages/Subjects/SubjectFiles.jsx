import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'

export default function SubjectFiles() {

    const { id } = useParams()
    const [post, setPost] = useState([])
    let subjectFiles = []

    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPost(Object.values(snap.val()))
            }
        })
    }, [])

    post.forEach(file => {
        if (file.subjectId == id) {
            subjectFiles.push(file)
        }
    })

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                {`Files ${String.fromCharCode(183)} ${subjectFiles.length}`}
            </div>
            <div className='flex-1 overflow-y-auto'>
                {
                    subjectFiles.map((v, k) =>
                        <Link key={k} to={`/posts/${v.postId}`}>
                            <div
                                className='h-16 border-b border-zinc-200 p-2 hover:underline hover:bg-zinc-100
                                transition-colors'>
                                <div className='text-sm text-zinc-700 font-semibold'>{v.postTitle}</div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    )
}
