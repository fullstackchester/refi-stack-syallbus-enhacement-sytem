import React from 'react'

export default function Notification() {
    return (
        <div className='w-60 h-80 bg-white absolute right-5 top-14 shadow-lg'>
            <div className='h-full w-full flex border border-zinc-200 rounded-md flex-col p-3'>
                <h1 className='font-medium text-sm text-zinc-600'>Notifications</h1>
                <div className='flex-1'>

                </div>
                <div className='h-auto flex justify-end'>
                    <button className='text-xs text-zinc-600 hover:underline italic'>Mark all as read</button>

                </div>

            </div>
        </div>
    )
}
