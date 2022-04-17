import React from 'react'

export default function LongInput(
    {
        id, label, form, type, required, onChange, currentData, placeholder, innerRef
    }
) {
    return (
        <label
            htmlFor={id}
            className='w-full h-auto border-b border-zinc-100 py-5 flex flex-row'>
            <span className='w-auto min-w-[15rem] text-zinc-600 font-medium flex items-center'>{label} </span>
            <input
                form={form}
                id={id}
                type={type}
                innerRef={innerRef}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                defaultValue={currentData}
                className=' border border-zinc-300 flex-1 py-2 px-3 outline-none rounded-md text-zinc-700
                            text-base ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300' />
        </label>
    )
}

export function LongTextArea(
    {
        id, label, form, type, required, onChange, currentData, placeholder, innerRef
    }
) {
    return (
        <label
            htmlFor={id}
            className='w-full h-auto border-b border-zinc-100 py-5 flex flex-row'>
            <span className='w-auto min-w-[15rem] text-zinc-600 font-medium flex items-start'>{label} </span>
            <textarea
                form={form}
                id={id}
                rows={8}
                type={type}
                innerRef={innerRef}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                defaultValue={currentData}
                className=' border border-zinc-300 flex-1 py-2 px-3 outline-none rounded-md text-zinc-700 whitespace-pre-line
                            text-base ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300 resize-none' />
        </label>
    )
}

