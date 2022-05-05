import React from 'react'

export default function SYStatus({ status }) {
    return (
        <div className={`${status === 'open' ? 'bg-green-600' : 'bg-red-600'}
         text-xs text-white font-medium flex items-center justify-center w-fit rounded-md p-1`}>
            {status}
        </div>
    )
}
