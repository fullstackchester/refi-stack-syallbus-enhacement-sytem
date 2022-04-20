import React, { useState, useEffect, Fragment } from 'react'
import { useFirebase } from '../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../js/Firebase'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'

function Account() {

    const { currentUser, logout } = useFirebase()
    const [name, setName] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const nav = useNavigate()

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const dialogMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus lectus id tortor sodales, ac scelerisque dolor scelerisque. Vestibulum vitae tellus et mauris eleifend imperdiet.'

    useEffect(() => {

        onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            return snapshot.val().userType === 'administrator' ? setIsAdmin(true) : setIsAdmin(false)
        })
        const getName = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            return setName(snapshot.val().name)
        })

        return getName

    }, []);

    useEffect(() => {

    }, [])

    function LogoutUser() {
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
        <div className='w-full h-auto border-t border-zinc-600 px-2 py-3 flex flex-row '>

            <img
                className='h-10 w-10 bg-zinc-800 rounded-[100%]'
                src={`https://firebasestorage.googleapis.com/v0/b/internship-project-ccbf7.appspot.com/o/avatars%2F${currentUser.uid}?alt=media&token=7aeb1e31-3c53-4e5b-8e46-529337af01ae`} />
            <div className='h-auto flex-grow flex flex-col px-2'>
                <span className='text-xs font-medium text-zinc-300'>{name && name}</span>
                <button
                    type='button'
                    onClick={openModal}
                    className='w-fit h-fit text-xs text-zinc-600
                    hover:text-sky-300'>Logout</button>
            </div>
            <Modal
                dialogTitle={`Logout account?`}
                dialogMessage={dialogMessage}
                handleClose={closeModal}
                buttonTitle={`Logout`}
                dedicatedFunction={LogoutUser}
                isOpen={isOpen} />
        </div>
    )
}
export default Account