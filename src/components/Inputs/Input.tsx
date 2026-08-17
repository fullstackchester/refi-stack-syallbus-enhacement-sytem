
import type { PropsWithChildren, ReactNode } from 'react'

interface InputProps extends PropsWithChildren {
    htmlFor: string
    label: ReactNode
    width?: string
}

export default function Input({ htmlFor, label, width = '' , children }: InputProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`h-auto min-h-[5rem] ${width} flex flex-col p-2`}>
            <span className='text-sm text-zinc-500 font-semibold'>{label}</span>
            {children}
        </label>
    )
}
