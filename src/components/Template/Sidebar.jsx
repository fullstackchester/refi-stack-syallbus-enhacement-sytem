import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { faBook, faUserCircle, faFileAlt, faGraduationCap, faSquarePollVertical, faUserTie, faChevronLeft, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'



function Sidebar() {

    const [minimize, setMinimize] = useState()
    const [role, setRole] = useState()
    const { currentUser } = useFirebase()
    const [loading, setLoading] = useState(true)
    const uid = currentUser.uid

    useEffect(() => {
        onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setRole(snap.val().userType)
                setLoading(false)
            }
        })
    }, []);


    return (
        <div className={`${minimize ? 'w-auto' : 'w-[15vw] min-w-[210px]'} h-screen
         bg-zinc-900 flex flex-col sticky top-0 transition-all`}>
            <header className='h-auto min-h-[3rem] flex flex-row text-white items-center py-5'>
                <img
                    alt='logo'
                    className='h-8 w-auto '
                    src={require('../../assets/Images/logo.svg').default} />
                {!minimize ? <h1 className='text-xl font-light headings'>Curriculum</h1> : ''}
            </header>
            <div className='w-full text-sm flex flex-col flex-1'>
                {
                    !loading ?
                        [{
                            title: 'Reports',
                            icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
                            link: '/reports',
                            restricted: role === 'faculty' ? 'hidden' : ''
                        },
                        {
                            title: 'Syllabus',
                            icon: <FontAwesomeIcon icon={faGraduationCap} />,
                            link: '/posts',
                            restricted: role === 'faculty' ? 'hidden' : ''
                        },
                        {
                            title: 'Faculty',
                            icon: <FontAwesomeIcon icon={faUserTie} />,
                            link: '/faculty',
                            restricted: role === 'faculty' ? 'hidden' : ''
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
                            link: '/profile/display-information',
                        },
                        ].map((val, key) =>
                            <NavLink
                                key={key}
                                to={val.link}
                                className={({ isActive }) => isActive ? 'text-sky-300 bg-zinc-800' : 'text-zinc-200'}>
                                <div className={`flex flex-row h-12 w-full hover:bg-zinc-800 transition-colors ${val.restricted}`}>
                                    <div className={`h-full w-12 flex justify-center items-center`}>
                                        {val.icon}
                                    </div>
                                    {!minimize && <div className={`h-full flex-1 flex items-center`}>
                                        {val.title}
                                    </div>}
                                </div>
                            </NavLink>
                        )
                        :
                        <div className='w-full h-full grid place-content-center place-items-center text-white'>
                            <FontAwesomeIcon icon={faSpinner} spin size='2x' />
                        </div>
                }
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