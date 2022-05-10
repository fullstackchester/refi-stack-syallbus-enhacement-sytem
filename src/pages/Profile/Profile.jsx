import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUserCircle } from '@fortawesome/free-solid-svg-icons'

export function Profile() {

	const nav = useNavigate()

	const { currentUser } = useFirebase()
	const [user, setUser] = useState({})
	const [metadata, setData] = useState({})

	useEffect(() => {
		setData(currentUser.metadata)

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
			<div className='w-[80%] h-auto min-h-[85vh] bg-white border border-zinc-200 rounded-md flex flex-row'>
				<div className='w-1/4 border-r border-zinc-200'>
					<div className='h-14 flex items-center justify-left py-2 px-4 font-semibold text-lg text-zinc-600 border-b border-zinc-100'>
						Account</div>
					{[
						{
							title: 'Profile',
							link: '/profile/display-information',
							icon: faUserCircle
						},
						{
							title: 'Security',
							link: '/profile/security',
							icon: faKey
						},
					].map((val, key) => {
						return (
							<Link key={key} to={val.link}>
								<div className='h-12 border-b border-zinc-100 flex flex-row items-center text-sm
								 font-medium text-zinc-600 hover:bg-zinc-100 transition-colors px-3'>
									<FontAwesomeIcon icon={val.icon} /> <span className='ml-3'>{val.title}</span>
								</div>
							</Link>
						)
					})}
				</div>
				<div className='flex-1 flex flex-col'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}