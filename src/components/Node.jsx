import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGear } from '@fortawesome/free-solid-svg-icons'

function Node(
    { link, title, subTitle, icon }
) {
    return (
        <div
            className='col-span-3 h-40 border border-zinc-200 bg-white rounded-md p-4
             flex flex-col cursor-pointer'>
            <h3 className='w-full h-min text-zinc-700 text-md font-medium overflow-hidden'>
                <FontAwesomeIcon icon={icon} className='mr-1 text-sm' /><Link to={link} className='hover:underline'> {title}</Link>
            </h3>
            <span className='h-min text-sm text-zinc-500 overflow-hidden text-ellipsis'>{subTitle}</span>
        </div>
    )
}

export default Node