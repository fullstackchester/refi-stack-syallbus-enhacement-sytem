import React from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faUserCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons'

function FacultyAccount() {

    const { uid } = useParams()
    const nav = useNavigate()

    const links = [
        {
            title: 'Profile',
            link: `/faculty/${uid}/profile`,
            icon: faUserCircle
        },
        {
            title: 'Syllabus',
            link: `/faculty/${uid}/syllabus`,
            icon: faFileAlt
        },
    ]
    // function capitalize(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1)
    // }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-row'>
                <div className='w-1/4 border-r border-zinc-100' >
                    <div className='h-14 flex flex-row items-center justify-left py-2 px-2 border-b
                     border-zinc-100 text-zinc-700'>
                        <button type='button'
                            className='h-8 w-8 rounded-full hover:bg-zinc-100'
                            onClick={() => nav('/faculty')}>
                            <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                        </button>
                        <span className='font-semibold text-lg ml-3'>Faculty</span>
                    </div>
                    {
                        links.map((val, key) =>
                            <Link key={key} to={val.link}>
                                <div className='h-12 border-b border-zinc-100 flex flex-row items-center text-xs 
                                font-medium text-zinc-600 hover:bg-zinc-100 transition-colors px-3'>
                                    <FontAwesomeIcon icon={val.icon} /> <span className='ml-3'>{val.title}</span>
                                </div>
                            </Link>)
                    }
                </div>
                <div className='flex-1 flex flex-col overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default FacultyAccount