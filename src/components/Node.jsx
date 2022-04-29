import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Node(
    { link, title, subTitle, icon }
) {
    return (
        <div
            className='col-span-3 h-40 border border-zinc-200 bg-white rounded-md p-4
             flex flex-col cursor-pointer hover:border-sky-600 transition-colors'>
            <h3 className='w-full h-min text-zinc-600 text-base font-semibold overflow-hidden'>
                <Link to={link} className='hover:underline'> {title}</Link>
            </h3>
            <span className='h-min text-xs font-medium text-zinc-500 overflow-hidden text-ellipsis'>{subTitle}</span>
        </div>
    )
}

export default Node