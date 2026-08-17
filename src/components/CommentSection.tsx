import { onValue, ref } from 'firebase/database'
import { useState, useEffect } from 'react'
import { database } from '../js/Firebase'
import { snapshotCollection } from '../js/FirebaseData'
import type { Comment } from '../types/domain'

interface CommentSectionProps {
    postId: string
}

export default function CommentSection(
    {
        postId
    }: CommentSectionProps
) {
    const [postComments, setComments] = useState<Comment[]>([])

    useEffect(() => {
        onValue(ref(database, `comments/${postId}`), snapshot => {
            if (snapshot.exists()) {
                setComments(snapshotCollection<Comment>(snapshot))
            }
        })
    }, [postId])

    return (
        <div className='w-full flex-1 h-auto min-h-40 flex flex-col p-4 overflow-y-auto'>
            {postComments ? postComments
                .sort((a, b) => new Date(b.commentDate).getTime() - new Date(a.commentDate).getTime())
                .map((val, key) =>
                    <div
                        title={val.commentDate}
                        key={key}
                        className={`w-3/4 h-max rounded-md bg-zinc-200/60 text-zinc-700 
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
