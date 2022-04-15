import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header';
import { IoBarChart, IoSchool, IoPeople, IoFileTray, IoBook } from 'react-icons/io5';
import { useFirebase } from '../../js/FirebaseContext';
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase';
import Account from '../Account'
import Sidebar from './Sidebar';

export default function Layout() {
    const SidebarData = [
        {
            title: 'Dashboard',
            icon: <IoBarChart />,
            link: '/dashboard',
        },
        {
            title: 'Syllabus',
            icon: <IoSchool />,
            link: '/curriculum',
        },
        {
            title: 'Faculty',
            icon: <IoPeople />,
            link: '/faculty',
        },
        {
            title: 'Files',
            icon: <IoFileTray />,
            link: '/files',
        },
        {
            title: 'Subjects',
            icon: <IoBook />,
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




