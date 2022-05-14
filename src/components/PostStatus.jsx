import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faEye, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'


export default function PostStatus(
    {
        postStatus, textSize
    }
) {
    return (
        <div
            className={`${postStatus === 'Approved' ? 'bg-green-600' : postStatus === 'Needs revisions' ? 'bg-red-600' : postStatus === 'Needs reviewing' ? 'bg-sky-600' : 'bg-zinc-600'} 
            text-white py-1 px-2 rounded-md flex flex-row items-center justify-center ml-2 w-max h-fit  transition-colors ${textSize} `}>
            {postStatus}
            {postStatus === 'Approved' ? <FontAwesomeIcon icon={faCheckCircle} className={`ml-1`} /> : postStatus === 'Needs revisions' ? <FontAwesomeIcon icon={faExclamationCircle} className={`ml-1`} /> : postStatus === 'Needs reviewing' ? <FontAwesomeIcon icon={faEye} className={`ml-1`} /> : ''}
        </div>
    )
}
