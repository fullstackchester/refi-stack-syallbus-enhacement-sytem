
import type { MouseEventHandler } from 'react'

const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700',
    sky: 'bg-sky-600 hover:bg-sky-700',
} as const

interface ButtonProps {
    title: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    color: keyof typeof colorClasses
}

export default function Button(
    { title, onClick, color }: ButtonProps
) {
    return (
        <button
            onClick={onClick}
            type='button'
            className={`p-2 border border-transparent rounded-md text-white ${colorClasses[color]}
             flex flex-row first:mr-2 last:mr-0`}>
            <span className='text-xs font-medium'>{title}</span>
        </button>
    )
}
