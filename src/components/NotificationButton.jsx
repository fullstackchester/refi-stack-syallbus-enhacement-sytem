import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref, update } from 'firebase/database'
import { database } from '../js/Firebase'
import { useFirebase } from '../js/FirebaseContext'
import Notification from './Notification'
import NotificationModal from './NotificationModal'

export default function NotificationButton({ handleClick }) {

    const [notifs, setNotifs] = useState([])
    const { currentUser } = useFirebase()
    const [isOpen, setOpen] = useState(false)
    const uid = currentUser.uid

    let myNotifs = []
    useEffect(() => {
        onValue(ref(database, `notifications`), snap => {
            setNotifs(Object.values(snap.val()))
        })
    }, [])

    notifs.forEach(i => {
        if (i.uid === uid && i.notificationType === 'check-post' && i.notificationStatus === 'unread') {
            myNotifs.push(i)
        }
    })


    return (
        <>
            <div className='h-8 w-8'>
                <button
                    title='Notifications'
                    onClick={() => setOpen(true)}
                    className='text-white h-8 w-8 hover:bg-zinc-700 rounded-full transition-colors'>
                    <FontAwesomeIcon icon={faBell} size={`sm`} className=' self-center justify-self-center' />
                </button>
                {myNotifs.length !== 0 &&
                    <div className='bg-red-600 text-xs rounded-full h-[1.1rem] flex items-center justify-center 
                        w-[1.1rem] p-1 text-white relative top-[-2rem] right-[-1rem]'>
                        {myNotifs.length}
                    </div>}
            </div>

            <NotificationModal
                isOpen={isOpen}
                handleClose={() => {
                    notifs.forEach(i => {
                        update(ref(database, `notifications/${i.notificationId}`), { notificationStatus: 'read' })
                            .then(() => {
                                setOpen(false)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                }} >
                <Notification />
            </NotificationModal>

        </>
    )
}
