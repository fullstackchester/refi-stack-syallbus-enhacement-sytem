import React, { useState, useEffect } from 'react'
import { useFirebase } from '../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../js/Firebase'
import { useNavigate } from 'react-router-dom'

function Account() {

    const { currentUser, logout } = useFirebase()
    const [name, setName] = useState()
    const nav = useNavigate()

    useEffect(() => {

        return onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            return setName(snapshot.val().name)
        })

    }, []);

    console.log(currentUser ? currentUser.uid : 'User has been logged out')



    const LogoutUser = () => {
        logout()
            .then((user) => {
                if (!user) {
                    nav('/')
                }
            }).catch((err) => {
                console(err.message)
            });
    }

    return (
        <div className='w-full h-auto border-t border-zinc-500 px-2 py-4 flex flex-row '>

            <img
                className='h-16 w-16 bg-zinc-800 rounded-[100%]'
                src={require('../assets/Images/avatar.jpg')} />
            <div className='h-auto flex-grow flex flex-col p-2'>
                <span className='text-sm font-medium text-zinc-300'>{name && name}</span>
                <span
                    onClick={(e) => {
                        e.preventDefault()
                        LogoutUser()
                    }}
                    className='w-fit h-fit text-xs text-zinc-600
                    hover:text-zinc-300 cursor-pointer'>Logout</span>
            </div>
        </div>
    )
}
export default Account