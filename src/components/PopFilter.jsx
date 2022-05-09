import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export default function PopFilter(
    {
        handleClose, isOpen, dialogTitle, dialogMessage, children
    }
) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={handleClose}
                >
                    <div className="min-h-screen px-4 text-center bg-zinc-800/70">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95" >

                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left
                             align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-zinc-700" >
                                    {dialogTitle}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">
                                        {dialogMessage}
                                    </p>
                                </div>
                                {children}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-xs font-medium text-white
                                         bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none
                                          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-3"
                                        onClick={handleClose} >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>

                </Dialog>
            </Transition>
        </>
    )
}
