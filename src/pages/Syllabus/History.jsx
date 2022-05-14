import React from 'react'
import { useParams } from 'react-router-dom'
import HistorySection from '../../components/HistorySection'

export default function History() {
    const { postId } = useParams()
    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>Edit history</div>
            <HistorySection postId={postId} />

        </>
    )
}
