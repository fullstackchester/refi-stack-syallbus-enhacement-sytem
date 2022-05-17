import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { database } from '../js/Firebase'

export default function CommentSection(
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
        <div className='w-full flex-1 h-auto min-h-[10rem] flex flex-col p-4 overflow-y-auto'>
            {postComments ? postComments
                .sort((a, b) => new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime())
                .map((val, key) =>
                    <div
                        title={val.commentDate}
                        key={key}
                        className={`w-3/4 h-max rounded-md bg-zinc-200/60 bg-opacity-70 text-zinc-700 
                        text-sm p-3 mb-3 `}>
                        <span className=' text-sm font-semibold'>{val.name}</span>
                        <br />
                        <div className=' whitespace-pre-wrap overflow-hidden break-all'>
                            {val.commentString}
                        </div>
                    </div>
                ) : ''}
        </div>
    )
}
