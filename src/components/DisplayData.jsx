import React from 'react'

export function DisplayData(
    {
        className,
        label,
        data
    }
) {
    return (
        <div className={className}>
            <div className='w-full h-full flex flex-col justify-center p-2'>
                <label className='text-sm font-base text-zinc-400'>{label}</label>
                <span className='text-xl font-medium text-zinc-600'>{data}</span>
            </div>
        </div>
    )
}
