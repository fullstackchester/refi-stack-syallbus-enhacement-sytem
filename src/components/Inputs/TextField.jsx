import React from 'react'

export default function TextField(
    {
        label,
        name,
        placeholder,
        type,
        required,
        onChange,
        value
    }
) {
    return (
        <div className='flex flex-col mb-3'>
            <label
                htmlFor={name}
                className='text-sm text-zinc-500 font-medium'>{label} {required ? <span className='h-fit text-lg text-sky-600'>*</span> : ''}
            </label>
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                required={required}
                value={value}
                className='w-full outline-none border border-zinc-300 rounded-md p-3
                text-zinc-700 text-sm focus:border-sky-600 focus:ring-1 focus:ring-sky-600' />

        </div>
    )
}

export function PanelTextField(
    {
        className,
        label,
        name,
        placeholder,
        type,
        required,
        onChange,
        formName,
    }
) {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className='text-xs text-zinc-500 font-medium'>{label}</label>
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                form={formName}
                required={required}
                onChange={onChange}
                className='w-auto outline-none border border-zinc-300 rounded-md p-2
                text-zinc-700 text-sm focus:border-sky-600 focus:ring-1 focus:ring-sky-600' />
        </div>
    )
}
