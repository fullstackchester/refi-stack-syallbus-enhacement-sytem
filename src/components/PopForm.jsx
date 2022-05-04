import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import LoadingButton from './LoadingButton'

export default function PopForm(
    { formTitle, formId, buttonTitle, func, isOpen, handleClose, children }
) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={handleClose}
                >
                    <div className="min-h-screen px-4 text-center">
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

                            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left
                             align-middle transition-all transform bg-white border border-zinc-200 shadow-xl rounded-lg">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-zinc-800" >
                                    {formTitle}
                                </Dialog.Title>
                                {children}

                                <div className="mt-4 flex flex-row justify-end">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-xs text-zinc-700 bg-zinc-200 border border-transparent rounded-md
                                         hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                                          focus-visible:ring-blue-500 mr-3"
                                        onClick={handleClose} >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form={formId}
                                        className="px-4 py-2 text-xs text-white bg-sky-600 border border-transparent rounded-md hover:bg-sky-700 focus:outline-none
                                          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-3" >
                                        {buttonTitle}
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
