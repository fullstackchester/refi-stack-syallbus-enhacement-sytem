import React from 'react'

export const Item = ({ children }) => {
    return (
        <div
            className='w-full h-12 border-b border-zinc-100 flex
            flex-row items-center text-sm font-medium text-zinc-500 py-2 px-4'>
            {children}
        </div>
    )
}


export const ItemSubject = (
    {
        courseCode,
        subjectTitle,
        creditUnit
    }
) => {
    return (
        <Item>
            <span className='h-auto w-1/6 '>{courseCode}</span>
            <span className='h-auto w-3/6 '>{subjectTitle}</span>
            <span className='h-auto w-2/6 '>{creditUnit}</span>
        </Item>
    )
}