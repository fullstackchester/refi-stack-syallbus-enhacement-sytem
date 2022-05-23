import React from 'react'

export default function Input({ htmlFor, label, width, children }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`h-auto min-h-[5rem] ${width} flex flex-col p-2`}>
            <span className='text-sm text-zinc-500 font-semibold'>{label}</span>
            {children}
        </label>
    )
}
