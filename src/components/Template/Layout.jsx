import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useFirebase } from '../../js/FirebaseContext';
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
    const { currentUser, } = useFirebase()
    const [name, setName] = useState()
    const [modalOpen, setModalOpen] = useState(false)


    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)


    return (
        <div className='w-full h-auto flex flex-row'>
            <Sidebar SidebarMenu={SidebarData} />
            <div className='h-auto flex-grow'>
                <Header />
                <div className='w-full h-auto py-7 px-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}




