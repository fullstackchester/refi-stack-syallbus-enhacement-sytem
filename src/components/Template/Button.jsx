import React from 'react'

export default function Button(
    { title, onClick, color }
) {
    return (
        <button
            onClick={onClick}
            type='button'
            className={`p-2 border border-transparent rounded-md text-white bg-${color}-600
             hover:bg-${color}-700 flex flex-row first:mr-2 last:mr-0`}>
            <span className='text-xs font-medium'>{title}</span>
        </button>
    )
}
