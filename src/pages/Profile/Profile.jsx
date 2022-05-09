import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import LoadingButton from '../../components/LoadingButton'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

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
			<div className='w-[80%] h-auto min-h-[85vh] bg-white border border-zinc-200 rounded-md flex flex-col'>
				<main className='flex-1 w-full px-10 py-5 flex flex-col items-center justify-start text-zinc-700'>
					<div className=' w-32 h-32'>
						<img
							id={`user-profile-avatar`}
							src={`hello.png`}
							className='w-full h-full bg-zinc-400  rounded-[100%] object-cover' />
					</div>
					<h2 className='text-xl font-semibold'>{user.name}</h2>
					<table className=' border-zinc-300 mt-5 w-full'>
						<tbody>
							<tr>
								<td className={`pr-2 text-sm`}>Employee Id:</td>
								<td className={`pr-2 text-sm`}>{user.employeeId}</td>
							</tr>
							<tr>
								<td className={`pr-2 text-sm`}>Email:</td>
								<td className={`pr-2 text-sm`}>{user.email}</td>
							</tr>
							<tr>
								<td className={`pr-2 text-sm`}>Department:</td>
								<td className={`pr-2 text-sm`}>{user.department}</td>
							</tr>
							<tr>
								<td className={`pr-2 text-sm`}>Account type:</td>
								<td className={`pr-2 text-sm`}>{caps(user.userType ? user.userType : '')}</td>
							</tr>
							<tr>
								<td className={`pr-2 text-sm`}>Last Sign-in:</td>
								<td className={`pr-2 text-sm`}>{metadata && metadata.lastSignInTime}</td>
							</tr>

							<tr>
								<td className={`pr-2 text-sm`}>Account verified:</td>
								<td className={`pr-2 text-sm`}>{(metadata.emailVerified ? 'Verified' : 'Not verified')}</td>
							</tr>
						</tbody>
					</table>
				</main>
				<footer className='h-14 flex flex-row items-center justify-end px-10'>
					<LoadingButton btnColor={`bg-zinc-600 hover:bg-zinc-700`} title={`Delete Account`} />
					<LoadingButton dedicatedFunc={() => nav(`/profile/edit-profile`)} title={`Edit profile`} />
				</footer>
			</div>
		</div>
	)
}