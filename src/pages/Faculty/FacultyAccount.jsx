import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useFirebase } from '../../js/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faIdBadge, faMessage, faUserCog, faUsersRectangle } from '@fortawesome/free-solid-svg-icons'
import LoadingButton from '../../components/LoadingButton'

function FacultyAccount() {

    const faculty = useParams()
    const nav = useNavigate()
    const [facultyData, setFacultyData] = useState({})
    const [userType, setUserType] = useState()


    useEffect(() => {
        const getFaculty = onValue(ref(database, 'users/' + faculty.id), snapshot => {
            if (snapshot.exists()) {
                setFacultyData(snapshot.val())
                setUserType(snapshot.val().userType)
                if (snapshot.val().photoUrl) {
                    getDownloadURL(storageRef(storage, `avatars/${faculty.id}/${snapshot.val().photoUrl}`))
                        .then((url) => {
                            const avatar = document.getElementById(`faculty-avatar`)
                            avatar.setAttribute('src', url)
                        }).catch((err) => {
                            console.log(err.message)
                        })
                } else {
                    const avatar = document.getElementById(`faculty-avatar`)
                    avatar.setAttribute('src', 'logo192.png')
                }
            }
        })
        return getFaculty
    }, [])

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    console.log(userType)

    return (
        <div className='w-full h-auto py-5 px-10 flex justify-center'>

            <div className='w-[80%] h-auto bg-white rounded-md border border-zinc-200'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`Faculty`} </span>
                </header>
                <main className='h-auto flex flex-row'>
                    <div className='w-full h-auto min-h-[400px] flex flex-col items-center py-3 px-10 text-zinc-700'>
                        <div className={`h-auto w-full flex justify-center`}>
                            <img
                                id={'faculty-avatar'}
                                className={`w-28 h-28 rounded-[100%] object-cover bg-zinc-100`} />

                        </div>
                        <span className={`text-2xl font-semibold text-center`}>
                            {facultyData.name}
                        </span>
                        <ul className='font-medium text-sm mt-3 w-2/3'>
                            <li className='flex flex-row items-center text-zinc-600 p-1'>
                                <FontAwesomeIcon icon={faIdBadge} className=' w-8 ' />
                                <span className='text-sm'>{facultyData.employeeId} </span>
                            </li>
                            <li className='flex flex-row items-center text-zinc-600 p-1'>
                                <FontAwesomeIcon icon={faEnvelope} className=' w-8 ' />
                                <span className='text-sm'>{facultyData.email} </span>
                            </li>
                            <li className='flex flex-row items-center text-zinc-600 p-1'>
                                <FontAwesomeIcon icon={faUsersRectangle} className=' w-8 ' />
                                <span className='text-sm'>{facultyData.department ? facultyData.department : `--`} </span>
                            </li>
                            <li className='flex flex-row items-center text-zinc-600 p-1'>
                                <FontAwesomeIcon icon={faUserCog} className=' w-8 ' />
                                <span className='text-sm'>{facultyData.userType && capitalize(facultyData.userType)} </span>
                            </li>
                        </ul>
                    </div>
                </main>
                <footer className='h-14 border-t border-zinc-200 flex items-center justify-end px-10 '>
                    <LoadingButton
                        dedicatedFunc={() => {
                            nav(`/faculty/edit/${faculty.id}`)
                        }}
                        title={`Edit Faculty`} />
                </footer>

            </div>

        </div>
    )
}

export default FacultyAccount