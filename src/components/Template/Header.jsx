import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons'


export default function Header() {
    const nav = useNavigate()

    function navigate(e, link) {
        e.preventDefault()
        nav(link)
    }
    return (
        <div className='h-12 w-full bg-zinc-800 shadow-sm sticky top-0 flex flex-row py-1 px-4 justify-end z-10 '>

            <div className='h-full w-32 flex flex-row items-center justify-evenly'>

                {[
                    {
                        icons: <FontAwesomeIcon icon={faBell} />,
                        onClick: (e) => navigate(e, 'notifications')
                    },
                    {
                        icons: <FontAwesomeIcon icon={faCog} />,
                        onClick: (e) => navigate(e, 'settings')
                    },
                    {
                        icons: <FontAwesomeIcon icon={faUserCircle} />,
                        onClick: (e) => navigate(e, 'profile')
                    },
                ].map((val, key) => {
                    return (
                        <span
                            onClick={val.onClick}
                            className='text-md text-white cursor-pointer hover:text-zinc-500'
                            key={key}>
                            {val.icons}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

{/* <HiCog className='text-xl text-zinc-700 cursor-pointer hover:text-zinc-500' onClick={(e) => navigate(e, 'settings')} /> */ }
