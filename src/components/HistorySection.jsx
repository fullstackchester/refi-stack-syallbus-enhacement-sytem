import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database, storage } from '../js/Firebase'
import PopHistory from './PopHistory'
import PostStatus from './PostStatus'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

export default function HistorySection({ postId }) {


    const [history, setHistory] = useState([])
    const [open, setOpen] = useState(false)
    const [prevPost, setPrev] = useState({})
    const [fileUrl, setFileUrl] = useState()

    useEffect(() => {
        onValue(ref(database, `history/${postId}`), snapshot => {
            if (snapshot.exists()) {
                setHistory(Object.values(snapshot.val()))


            }
        })
    }, [])






    return (
        <div className={`flex flex-col flex-1`}>
            {history.length !== 0 ? history
                .sort((a, b) => new Date(b.historyDate).getTime() - new Date(a.historyDate).getTime())
                .map((val, key) =>
                    <div
                        onClick={() => {
                            setOpen(true)
                            setPrev(val.previousPost)
                        }}
                        key={key}
                        className='h-auto border-b border-zinc-100 text-xs text-zinc-600 font-medium p-2
                     cursor-pointer hover:bg-zinc-500 hover:text-white transition-colors'>
                        {`Edited: ${val.historyDate}`}
                    </div>
                )
                :
                <div className='flex-1 text-xs text-zinc-600 font-medium p-2 text-center'>
                    <div className='h-full w-full grid place-items-center place-content-center'>
                        <span className='text-2xl text-zinc-600 font-semibold'>No Edit History</span>
                    </div>
                </div>
            }
            <PopHistory
                isOpen={open}
                handleClose={() => setOpen(false)}>
                <div className='h-auto min-h-[300px]'>
                    <div className='h-8 flex flex-row items-center font-medium'>
                        {prevPost.postTitle} <PostStatus textSize={`text-xs`} postStatus={prevPost.postStatus} />
                    </div>
                    <div className='text-xs text-zinc-600 font-medium'>
                        Attachments: <span
                            onClick={() => {
                                getDownloadURL(storageRef(storage, prevPost.postFileUrl))
                                    .then((url) => {
                                        window.open(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`, '_blank')
                                    })
                                    .catch((e) => {
                                        console.log(e)
                                    });

                            }}
                            className='hover:underline cursor-pointer'>{prevPost.postFile}</span>
                    </div>
                    <div className='text-xs text-zinc-600 font-medium'>{`Posted: ${prevPost.postDate}`} </div>
                    <div className='text-sm text-zinc-600 mt-3'>
                        {prevPost.postDescription}
                    </div>
                </div>
            </PopHistory>
        </div>
    )
}
