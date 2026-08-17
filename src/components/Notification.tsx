import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../js/Firebase'
import { snapshotCollection } from '../js/FirebaseData'
import { useFirebase } from '../js/FirebaseContext'
import type { Notification as NotificationRecord } from '../types/domain'

export default function Notification() {

    const { currentUser } = useFirebase()
    const [notifs, setNotifs] = useState<NotificationRecord[]>([])
    const uid = currentUser?.uid ?? ''

    useEffect(() => {
        onValue(ref(database, `notifications`), snap => {
            if (snap.exists()) {
                setNotifs(snapshotCollection<NotificationRecord>(snap))
            }
        })
    }, [])

    const myNotifs = notifs.filter((notification) =>
        notification.uid === uid && notification.notificationType === 'check-post')

    return (
        <div className='h-full w-full flex rounded-md flex-col p-3 overflow-y-auto'>
            <h1 className='font-semibold text-base text-zinc-600'>Notifications</h1>
            <div className='flex-1 flex flex-col'>
                {
                    myNotifs
                        .sort((x, y) => new Date(y.notificationDate).getTime() - new Date(x.notificationDate).getTime())
                        .map((v, k) => {
                            return (
                                <div
                                    onClick={() => {
                                        window.open(`/posts/${v.postId}`, '_self')
                                    }}
                                    key={k}
                                    className={`h-20 border-b border-zinc-100 hover:bg-blue-50 p-2 cursor-pointer
                                     transition-colors flex flex-col ${v.notificationStatus === 'unread' ? 'bg-blue-50' : ''}`}>
                                    <div className='text-sm text-zinc-700 font-medium flex-1'>
                                        {v.notificationMessage}
                                    </div>
                                    <h6 className='text-xs text-sky-600 font-semibold'>{v.notificationDate}</h6>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}
