import React from 'react'
import { NavLink } from 'react-router-dom'
import Account from '../Account'

function Sidebar({
    SidebarMenu
}) {
    return (
        <div className='w-[240px] h-screen bg-zinc-900 flex flex-col sticky top-0'>
            <header className='h-12 flex flex-row text-white items-center border-b border-zinc-50/30'>
                <img
                    className='h-8 w-auto'
                    src={require('../../assets/Images/logo.svg').default} />
                <h1 className='text-lg font-light headings'>Curriculum</h1>

            </header>
            <ul className='flex flex-col flex-grow py-5'>
                {SidebarMenu.map((val, key) => {
                    return (

                        <NavLink
                            to={val.link}
                            key={key}
                            className={({ isActive }) => isActive ? 'text-white font-light' : 'text-zinc-500'} >
                            <li
                                className='w-full h-12 text-inherit hover:text-white flex flex-row
                                    hover:bg-zinc-800 text-sm px-4'>
                                <div className='p-2 flex justify-center items-center'>{val.icon}</div>
                                <div className='p-1 flex justify-center items-center'>{val.title}</div>
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