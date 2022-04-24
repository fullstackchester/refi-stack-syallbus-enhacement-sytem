import React from 'react'

export default function PostStatus(
    {
        postStatus, textSize
    }
) {
    return (
        <div
            className={`${postStatus === 'Approved' ? 'bg-green-600' : postStatus === 'Needs revisions' ? 'bg-red-600' : postStatus === 'Needs reviewing' ? 'bg-sky-600' : 'bg-zinc-600'} 
            text-white p-1 rounded-md ${textSize} `}>
            {postStatus}
        </div>
    )
}
