import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFile, faGraduationCap, faSquarePollVertical, faUserTie } from '@fortawesome/free-solid-svg-icons'


export default function Layout() {
    const SidebarData = [
        {
            title: 'Dashboard',
            icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
            link: '/dashboard',
        },
        {
            title: 'Syllabus',
            icon: <FontAwesomeIcon icon={faGraduationCap} />,
            link: '/curriculum',
        },
        {
            title: 'Faculty',
            icon: <FontAwesomeIcon icon={faUserTie} />,
            link: '/faculty',
        },
        {
            title: 'Files',
            icon: <FontAwesomeIcon icon={faFile} />,
            link: '/files',
        },
        {
            title: 'Subjects',
            icon: <FontAwesomeIcon icon={faBook} />,
            link: '/subjects',
        },
    ]
    return (
        <div className='w-full h-auto flex flex-row'>
            <Sidebar SidebarMenu={SidebarData} />
            <div className='h-auto flex-grow'>
                <Header />
                <div className='w-full h-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}




