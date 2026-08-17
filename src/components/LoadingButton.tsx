import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface LoadingButtonProps {
    dedicatedFunc?: MouseEventHandler<HTMLButtonElement>
    loadingState: boolean
    title: string
    form?: string
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
    btnColor?: string
}

export default function LoadingButton(
    { dedicatedFunc, loadingState, title, form, buttonType, type, btnColor = '' }: LoadingButtonProps
) {

    return (
        <button
            form={form}
            type={buttonType ?? type ?? 'button'}
            onClick={dedicatedFunc}
            className={`rounded-md outline-none border border-transparent py-2 px-3 text-xs ml-2 hover:bg-sky-700
                bg-sky-600 text-white flex flex-row transition-transform shadow-md shadow-sky-300/50 ${btnColor}`} >
            {title}
            {loadingState ? <FontAwesomeIcon
                className='text-lg ml-2'
                icon={faCircleNotch} spin /> : ''}
        </button>
    )
}
