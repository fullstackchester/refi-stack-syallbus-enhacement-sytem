import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Account from '../Account'
import { IoChevronForward } from 'react-icons/io5'


function Sidebar({
    SidebarMenu
}) {

    const [minimize, setMinimize] = useState(false)

    console.log(minimize)
    return (
        <div className='w-[240px] min-w-[240px] h-screen bg-zinc-900 flex flex-col sticky top-0'>
            <header className='h-12 flex flex-row text-white items-center border-b border-zinc-50/30'>
                <img

                    className='h-8 w-auto'
                    src={require('../../assets/Images/logo.svg').default} />
                <h1 className='text-md headings'>Curriculum</h1>

            </header>
            <h4 className='text-sm text-zinc-200 ml-5 my-2'>Menu</h4>
            <ul className='flex flex-col flex-grow'>
                {SidebarMenu.map((val, key) => {
                    return (

                        <NavLink
                            to={val.link}
                            key={key}
                            className={({ isActive }) => isActive ? 'text-sky-300 font-medium' : 'text-zinc-500'} >
                            <li
                                className='w-full h-12 text-inherit flex flex-row
                                    hover:bg-zinc-800 text-sm pl-3'>
                                <div className='h-full w-12 text-xl flex justify-center items-center'>{val.icon}</div>
                                <div className='p-1 flex text-md justify-center items-center'>{val.title}</div>
                            </li>

                        </NavLink>
                    )
                })}
            </ul>
            <Account />
        </div>
    )
}

export default Sidebar