import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useFirebase } from '../../js/FirebaseContext'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUserCircle } from '@fortawesome/free-solid-svg-icons'

export function Profile() {

	return (
		<div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
			<div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-row'>
				<div className='w-1/4 border-r border-zinc-100'>
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
							<NavLink
								key={key} to={val.link}
								className={({ isActive }) => isActive ? 'text-red-600' : 'text-white'}>
								<div className='h-12 border-b border-zinc-100 flex flex-row items-center text-xs
								 font-medium text-zinc-600 hover:bg-zinc-100 transition-colors px-3'>
									<FontAwesomeIcon icon={val.icon} /> <span className='ml-3'>{val.title}</span>
								</div>
							</NavLink>
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