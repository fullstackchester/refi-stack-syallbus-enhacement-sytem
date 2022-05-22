import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSignOut } from '@fortawesome/free-solid-svg-icons'
import Notification from '../Notification'
import Modal from '../Modal'
import { signOut } from 'firebase/auth'
import { auth } from '../../js/Firebase'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import NotificationModal from '../NotificationModal'
import NotificationButton from '../NotificationButton'



export default function Header() {
    const nav = useNavigate()
    const [isOpen, setOpen] = useState(false)
    const [logout, setLogout] = useState(false)
    const { currentUser } = useFirebase()


    useEffect(() => {
        return function () {
            if (currentUser === null) {
                nav('/')
            }
        }
    }, [currentUser])


    function logoutUser() {
        signOut(auth)
    }


    return (
        <>
            <div className='h-12 w-full bg-zinc-800 shadow-sm sticky top-0 flex flex-row py-1 px-4 justify-end z-50 '>

                <div className='h-full w-auto min-w-[8rem] flex flex-row items-center'>

                    <NotificationButton />

                    <div className='flex-1 h-full flex flex-row items-center'>
                        <button onClick={() => setLogout(true)} title='Logout'
                            className='text-white h-8 w-8 flex items-center justify-center 
         hover:bg-zinc-700 rounded-full transition-colors'>
                            <FontAwesomeIcon icon={faSignOut} size={`sm`} />
                        </button>

                    </div>
                </div>
                <Modal isOpen={logout}
                    handleClose={() => setLogout(false)}
                    dialogTitle={`Logout Account?`}
                    dialogMessage={`Are you sure you want to logout?`}
                    buttonTitle={`Logout`}
                    dedicatedFunction={logoutUser} />
            </div>
        </>
    )
}

{/* <HiCog className='text-xl text-zinc-700 cursor-pointer hover:text-zinc-500' onClick={(e) => navigate(e, 'settings')} /> */ }
