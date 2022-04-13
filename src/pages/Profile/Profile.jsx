import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { HiIdentification } from 'react-icons/hi'
import { MdEmail, MdEdit } from 'react-icons/md'

export function Profile() {

	const nav = useNavigate()

	const { currentUser } = useFirebase()
	const [user, setUser] = useState({
		uid: '',
		email: '',
		name: '',
		userType: ''
	})

	useEffect(() => {



		const getUserData = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
			if (snapshot.exists()) {
				setUser({
					uid: snapshot.val().uid,
					email: snapshot.val().email,
					name: snapshot.val().name,
					userType: snapshot.val().userType,
				})

			} else {
				return setUser('No data available')
			}
		})


		return getUserData
	}, [])



	return (
		<main className='h-auto p-4  grid grid-cols-4 border border-zinc-100 rounded-lg bg-white shadow-sm'>

			<div className='col-span-1 h-full flex justify-center py-4'>
				<img
					width={200}
					className='rounded-[100%]'
					src={require('../../assets/Images/avatar.jpg')} />
			</div>
			<div className='col-span-3 h-full grid grid-cols-4 grid-rows-6'>

				<div className='col-span-3 row-span-2 flex items-center p-2'>
					<span className='text-3xl text-zinc-700 font-semibold'>{user.name}</span>
				</div>

				<div className='col-span-1 row-span-2 flex justify-end'>
					<Link
						className='w-fit h-fit text-sm text-zinc-500 font-medium flex hover:text-sky-600'
						to='/edit-profile'>Edit profile <MdEdit className='ml-2' /></Link>

				</div>
				<div className='col-span-2 row-span-1 flex items-center flex-row text-zinc-500 px-2'>
					<HiIdentification className='h-full text-xl' />
					<span className='text-sm font-medium p-2'>
						{user.uid}
					</span>
				</div>
				<div className='col-span-2 row-span-1 flex items-center flex-row text-zinc-500 px-2'>
					<MdEmail className='h-full text-xl' />
					<span className='text-sm font-medium p-2'>
						{user.email}
					</span>
				</div>
				<div className='col-span-2 row-span-1 flex items-center flex-row text-zinc-500 px-2'>
					<MdEmail className='h-full text-xl' />
					<span className='text-sm font-medium p-2'>
						{user.userType}
					</span>
				</div>
			</div>
		</main>
	)
}