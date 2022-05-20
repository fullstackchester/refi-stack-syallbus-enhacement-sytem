import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faComment, faHistory, faChevronLeft } from '@fortawesome/free-solid-svg-icons'



export default function ViewPost() {

    const { postId } = useParams()
    const nav = useNavigate()
    const links = [
        {
            title: 'Information',
            link: `/posts/${postId}/information`,
            icon: faKey
        },
        {
            title: 'Comments',
            link: `/posts/${postId}/comments`,
            icon: faComment
        },
        {
            title: 'Edit history',
            link: `/posts/${postId}/edit-history`,
            icon: faHistory
        }
    ]

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <main className='h-[90vh] w-[85%] bg-white  rounded-md flex flex-row'>
                <div className='w-1/4 border-r border-zinc-100'>
                    <div className='h-14 flex flex-row items-center justify-left py-2 px-2 border-b
                     border-zinc-100 text-zinc-700'>
                        <button type='button'
                            className='h-8 w-8 rounded-full hover:bg-zinc-100'
                            onClick={() => nav('/posts')}>
                            <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                        </button>
                        <span className='font-semibold text-lg ml-3'>Post</span>
                    </div>

                    {links.map((val, key) =>
                        <NavLink
                            key={key} to={val.link}
                            className={({ isActive }) => isActive ? 'text-red-600' : 'text-white'}>
                            <div className='h-12 border-b border-zinc-100 flex flex-row items-center text-xs
								 font-medium text-zinc-600 hover:bg-zinc-100 transition-colors px-3'>
                                <FontAwesomeIcon icon={val.icon} /> <span className='ml-3'>{val.title}</span>
                            </div>
                        </NavLink>)}
                </div>
                <div className='flex-1 flex flex-col'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
