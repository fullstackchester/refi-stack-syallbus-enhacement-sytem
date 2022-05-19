import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useFirebase } from '../js/FirebaseContext'
import { ref, update } from 'firebase/database'
import { database } from '../js/Firebase'

export default function Status({ postId }) {
    
    const { role } = useFirebase()

    function changeStatus(UpdateStatus) {
        update(ref(database, `posts/${postId}`), { postStatus: UpdateStatus, })
    }

    return (
        <div className="w-full text-right z-50">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        disabled={role === 'faculty' ? true : false}
                        className={`inline-flex justify-center items-center w-full px-2 py-1 text-xs
                        text-white bg-zinc-600 rounded-md hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 
                        focus-visible:ring-white focus-visible:ring-opacity-75`}>
                        Set Status
                        <ChevronDownIcon
                            className="w-5 h-5 text-white"
                            aria-hidden="true" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter={`transition ease-out duration-100`}
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95" >
                    <Menu.Items className={`absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100
                     rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                        <div className="px-1 py-1 ">
                            {[
                                { title: 'Need reviews', status: 'Needs reviewing', },
                                { title: 'Approved', status: 'Approved', },
                                { title: 'Need revisions', status: 'Needs revisions', }
                            ].map((val, key) =>
                                <Menu.Item key={key}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => {
                                                changeStatus(val.status)
                                            }}
                                            className={
                                                `${active ? 'bg-zinc-600 text-white' : 'text-gray-900'}
                                                     group flex rounded-md items-center w-full px-2 py-2 text-sm`} >
                                            {val.title}
                                        </button>
                                    )
                                    }
                                </Menu.Item>)}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}