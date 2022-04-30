import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { faBook, faUserCircle, faFileAlt, faGraduationCap, faSquarePollVertical, faUserTie, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Sidebar() {

    const [minimize, setMinimize] = useState(false)
    return (
        <div className={`${minimize ? 'w-auto' : 'w-[15vw] min-w-[210px]'} h-screen bg-zinc-900 flex flex-col sticky top-0`}>
            <header className='h-12 flex flex-row text-white items-center border-b border-zinc-50/30'>
                <img

                    className='h-8 w-auto'
                    src={require('../../assets/Images/logo.svg').default} />
                {!minimize ? <h1 className='text-md headings'>Curriculum</h1> : ''}
            </header>
            <div className='w-full text-sm flex flex-col flex-1'>
                {[
                    {
                        title: 'Dashboard',
                        icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
                        link: '/dashboard',
                    },
                    {
                        title: 'Syllabus',
                        icon: <FontAwesomeIcon icon={faGraduationCap} />,
                        link: '/posts',
                    },
                    {
                        title: 'Faculty',
                        icon: <FontAwesomeIcon icon={faUserTie} />,
                        link: '/faculty',
                    },
                    {
                        title: 'Subjects',
                        icon: <FontAwesomeIcon icon={faBook} />,
                        link: '/subjects',
                    },
                    {
                        title: 'Files',
                        icon: <FontAwesomeIcon icon={faFileAlt} />,
                        link: '/files',
                    },
                    {
                        title: 'Account',
                        icon: <FontAwesomeIcon icon={faUserCircle} />,
                        link: '/profile',
                    },
                ].map((val, key) =>
                    <NavLink
                        key={key}
                        to={val.link}
                        className={({ isActive }) => isActive ? 'text-sky-300' : 'text-zinc-200'}>
                        <div className='flex flex-row h-12 w-full hover:bg-zinc-800 transition-colors'>
                            <div className={`h-full w-12 flex justify-center items-center`}>
                                {val.icon}
                            </div>
                            {!minimize && <div className={`h-full flex-1 flex items-center`}>
                                {val.title}
                            </div>}
                        </div>
                    </NavLink>)}
            </div>
            <button
                type={`button`}
                className={`h-12 flex items-center justify-end px-4 text-white border-t border-zinc-700 `}
                onClick={() => minimize ? setMinimize(false) : setMinimize(true)}
            > {minimize ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}
            </button>
        </div>
    )
}

export default Sidebar