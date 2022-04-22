import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Status() {

    const [status, setStatus] = useState()
    const statusButtons = [
        {
            title: 'Need reviews',
            onClick: () => setStatus('Need reviews'),
        },
        {
            title: 'Approved',
            onClick: () => setStatus('Approved'),
        },
        {
            title: 'Need revisions',
            onClick: () => setStatus('Need revisions'),
        }
    ]

    function changeStatus(e) {
        e.preventDefault()
    }
    console.log(status)

    return (
        <div className="w-full text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium 
                        text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus-visible:ring-2
                      focus-visible:ring-white focus-visible:ring-opacity-75">
                        Set Status
                        <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1 text-white "
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100
                     rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">

                            {statusButtons && statusButtons.map((val, key) => {
                                return (
                                    <Menu.Item key={key}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => {
                                                    setStatus('Need revisions')
                                                }}
                                                className={
                                                    `${active ? 'bg-zinc-400 text-white' : 'text-gray-900'}
                                                     group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                {val.title}
                                            </button>
                                        )}
                                    </Menu.Item>
                                )
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}