import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header';
import { IoBarChart, IoSchool, IoPeople, IoFileTray, IoBook } from 'react-icons/io5';
import { useFirebase } from '../../js/FirebaseContext';
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase';
import Account from '../Account'

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
            link: '/subject',
        },
    ]
    const { currentUser, } = useFirebase()
    const [name, setName] = useState()
    const [modalOpen, setModalOpen] = useState(false)


    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    useEffect(() => {
        return onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            return setName(snapshot.val().name)
        })

    }, []);


    return (
        <div className='w-full h-auto flex flex-row'>
            <div className='w-[240px] h-screen bg-zinc-900 flex flex-col sticky top-0'>
                {/* NAVIGATION SIDEBAR */}
                <header className='h-12 flex flex-row text-white items-center border-b border-zinc-50/30'>
                    <img
                        className='h-8 w-auto'
                        src={require('../../assets/Images/avatar.jpg').default} />
                    <h1 className='text-lg font-light headings'>Curriculum</h1>

                </header>
                <ul className='flex flex-col flex-grow py-5'>
                    {SidebarData.map((val, key) => {
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
            <div className='h-auto w-[calc(100%-240px)]'>
                <Header />
                <div className='w-full h-auto py-7 px-10'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}


export const Container = () => {
    return (
        <div className='h-auto border border-slate-100 bg-white rounded-lg shadow-md '>
            <Outlet />
        </div>
    )
}




