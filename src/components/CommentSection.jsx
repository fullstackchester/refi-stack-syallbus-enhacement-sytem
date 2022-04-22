import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { database } from '../js/Firebase'

export default function Comments(
    {
        postId
    }
) {
    const [postComments, setComments] = useState([])
    const [commentAuthor, setAuthor] = useState()

    function getFacultyName(uid) {

    }

    useEffect(() => {
        onValue(ref(database, `comments/${postId}`), snapshot => {
            if (snapshot.exists()) {
                setComments(Object.values(snapshot.val()))
            } else {
                console.log('invalid path')
            }
        })

    }, [])

    return (
        <div className='w-full h-auto min-h-[10rem] grid grid-cols-4 gap-3'>
            {postComments ? postComments.map((val, key) =>
                <div
                    key={key}
                    className={`col-span-3 h-auto min-h-[3.5rem] rounded-md bg-zinc-200 bg-opacity-70 text-zinc-700
                    text-sm border p-3`}>
                    <span className=' text-base font-semibold'>{val.uid}</span>
                    <br />
                    {val.commentString}
                </div>
            ) : ''}
        </div>
    )
}
