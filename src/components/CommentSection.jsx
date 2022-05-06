import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { database } from '../js/Firebase'

export default function Comments(
    {
        postId
    }
) {
    const [postComments, setComments] = useState([])

    useEffect(() => {
        onValue(ref(database, `comments/${postId}`), snapshot => {
            if (snapshot.exists()) {
                setComments(Object.values(snapshot.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-auto min-h-[10rem] grid grid-cols-4 gap-3 py-4'>
            {postComments ? postComments
                .sort((a, b) => new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime())
                .map((val, key) =>
                    <div
                        title={val.commentDate}
                        key={key}
                        className={`col-span-3 h-auto rounded-md bg-zinc-200/60 bg-opacity-70 text-zinc-700 
                        text-sm border p-3`}>
                        <span className=' text-sm font-semibold'>{val.name}</span>
                        <br />
                        {val.commentString}
                    </div>
                ) : ''}
        </div>
    )
}
