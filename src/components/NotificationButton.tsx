import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref, update } from 'firebase/database'
import { database } from '../js/Firebase'
import { snapshotCollection } from '../js/FirebaseData'
import { useFirebase } from '../js/FirebaseContext'
import Notification from './Notification'
import NotificationModal from './NotificationModal'
import type { Notification as NotificationRecord } from '../types/domain'

export default function NotificationButton() {

    const [notifs, setNotifs] = useState<NotificationRecord[]>([])
    const { currentUser } = useFirebase()
    const [isOpen, setOpen] = useState(false)
    const uid = currentUser?.uid ?? ''

    useEffect(() => {
        onValue(ref(database, `notifications`), snap => {
            setNotifs(snap.exists() ? snapshotCollection<NotificationRecord>(snap) : [])
        })
    }, [])

    const myNotifs = notifs.filter((notification) =>
        notification.uid === uid
        && notification.notificationType === 'check-post'
        && notification.notificationStatus === 'unread')


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
                        w-[1.1rem] p-1 text-white relative -top-8 -right-4'>
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
