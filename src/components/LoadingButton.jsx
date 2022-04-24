import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'


export default function LoadingButton(
    { dedicatedFunc, loadingState, title, form, buttonType, btnColor }
) {


    return (
        <button
            form={form}
            type={buttonType}
            onClick={dedicatedFunc}
            className={`rounded-md outline-none border border-transparent py-2 px-3 text-sm ml-2 hover:bg-sky-700
                bg-sky-600 text-white flex flex-row transition-transform shadow-md shadow-sky-300/50 ${btnColor}`} >
            {title}
            {loadingState ? <FontAwesomeIcon
                className='text-lg ml-2'
                icon={faCircleNotch} spin /> : ''}
        </button>
    )
}
