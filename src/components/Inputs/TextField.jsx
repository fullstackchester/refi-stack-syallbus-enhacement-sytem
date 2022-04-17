import React from 'react'

export default function TextField(
    {
        label,
        name,
        placeholder,
        type,
        required,
        onChange,
        initialValue
    }
) {
    return (
        <div className='flex flex-col mb-3'>
            <label
                htmlFor={name}
                className='text-sm text-zinc-600 font-medium'>{label} {required ? <span className='h-fit text-lg text-sky-600'>*</span> : ''}
            </label>
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                required={required}
                defaultValue={initialValue}
                className='w-full outline-none border border-zinc-300 rounded-md p-3
                text-zinc-700 text-sm focus:border-sky-600 focus:ring-1 focus:ring-sky-600' />

        </div>
    )
}   
