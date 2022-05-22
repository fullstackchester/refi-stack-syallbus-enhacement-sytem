import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loading() {
    return (
        <div className='flex-1 overflow-y-auto flex items-center justify-center'>
            <div className='flex flex-col text-zinc-600'>
                <FontAwesomeIcon icon={faSpinner} spin size='3x' />
                <span className='font-medium text-sm mt-2 text-center '>Loading...</span>
            </div>
        </div>

    )
}
