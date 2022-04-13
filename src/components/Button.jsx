import React from 'react'

function Button(
    {
        className,
        title,
        onClick
    }
) {
    return (
        <div className={className}>
            <button
                onClick={onClick}
                className='w-full h-auto bg-zinc-700 text-white
                 text-sm p-2 outline-none rounded-lg'>
                {title}
            </button>
        </div>
    )
}

export default Button