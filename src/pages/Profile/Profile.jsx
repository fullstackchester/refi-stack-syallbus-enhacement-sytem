import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { HiIdentification } from 'react-icons/hi'
import { MdEmail, MdEdit, MdSupervisorAccount } from 'react-icons/md'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

export function Profile() {

	const nav = useNavigate()

	const { currentUser } = useFirebase()
	const [user, setUser] = useState({})

	useEffect(() => {

		const getUserData = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
			if (snapshot.exists()) {
				setUser(snapshot.val())
				getDownloadURL(storageRef(storage, `avatars/${currentUser.uid}/${snapshot.val().photoUrl}`))
					.then((url) => {
						const avatar = document.getElementById(`user-profile-avatar`)
						avatar.setAttribute('src', url)
					}).catch((err) => {
						console.log(err.message)
					})

			} else {
				return setUser('No data available')
			}
		})
		return getUserData
	}, [])

	function caps(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<div className='w-full h-auto px-10 py-5 flex items-center justify-center'>
			<div className='w-[80%] h-auto min-h-[600px] bg-white border border-zinc-200 rounded-md shadow-sm flex flex-col'>
				<main className='flex-1 w-full p-5 flex flex-col items-center text-zinc-700'>
					<div className=' w-32 h-32'>
						<img
							id={`user-profile-avatar`}
							src={`hello.png`}
							className='w-full h-full bg-zinc-400  rounded-[100%] object-cover'
						/>

					</div>
					<h2 className='text-2xl font-semibold'>{user.name}</h2>
					<span className='text-sm font-medium'>{user.userType ? caps(user.userType) : ''}</span>
				</main>
				<footer className='h-12 border-t border-zinc-200 flex justify-end'>
					<button
						onClick={(e) => {
							e.preventDefault()
							nav('/edit-profile')
						}}
						className='text-xs border-x border-zinc-200 px-4 bg-zinc-800 text-white rounded-br-md
						hover:bg-zinc-700'>
						Edit Profile
					</button>

				</footer>

			</div>

		</div>
	)
}