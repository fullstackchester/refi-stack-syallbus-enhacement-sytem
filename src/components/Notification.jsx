import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../js/Firebase'
import { useFirebase } from '../js/FirebaseContext'

export default function Notification() {

    const { currentUser } = useFirebase()
    const [notifs, setNotifs] = useState([])
    const uid = currentUser.uid
    const nav = useNavigate()
    let myNotifs = []

    useEffect(() => {
        onValue(ref(database, `notifications`), snap => {
            if (snap.exists()) {
                setNotifs(Object.values(snap.val()))
            }
        })
    }, [])

    notifs.forEach(i => {
        if (i.uid === uid && i.notificationType === 'check-post') {
            myNotifs.push(i)
        }
    })

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
