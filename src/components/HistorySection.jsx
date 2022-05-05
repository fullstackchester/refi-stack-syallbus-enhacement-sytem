import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../js/Firebase'
import PopHistory from './PopHistory'
import PostStatus from './PostStatus'

export default function History(
    { postId }
) {
    const [history, setHistory] = useState([])
    const [open, setOpen] = useState(false)
    const [prevPost, setPrev] = useState({})

    useEffect(() => {
        return onValue(ref(database, `history/${postId}`), snapshot => {
            setHistory(Object.values(snapshot.val()))
        })
    }, [])


    return (
        <div className={`flex flex-col`}>

            {history.map((val, key) =>
                <div
                    onClick={() => {
                        setOpen(true)
                        setPrev(val.previousPost)
                    }}
                    key={key}
                    className='h-auto border-b border-zinc-100 text-xs text-zinc-600 font-medium p-2
                     cursor-pointer hover:bg-zinc-500 hover:text-white transition-colors'>
                    {`Edited: ${val.historyDate} - ${val.historyTime}`}
                </div>
            )}
            <PopHistory
                isOpen={open}
                handleClose={() => setOpen(false)}>
                <div className='h-auto min-h-[300px]'>
                    <div className='h-8 flex flex-row items-center font-medium'>
                        {prevPost.postTitle} <PostStatus textSize={`text-xs`} postStatus={prevPost.postStatus} />
                    </div>
                    <span className='text-xs text-zinc-600 font-medium'>{`Posted: ${prevPost.postDate}`} </span>
                    <div className='text-sm text-zinc-600 mt-3'>
                        {prevPost.postDescription}
                    </div>
                </div>
            </PopHistory>
        </div>
    )
}
