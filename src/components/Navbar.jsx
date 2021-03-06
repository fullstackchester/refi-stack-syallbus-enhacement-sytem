import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

export default function Navbar(
    {
        headerTitle, searchBarOnChange, buttonOnClick, title
    }
) {
    return (
        <nav className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
            <span className='text-lg flex items-center font-medium text-zinc-600 '>{headerTitle}</span>
            <div className='h-full w-auto min-w-[20rem] flex flex-row py-2'>
                <div className="flex justify-center flex-1 bg-transparent mr-2">
                    <input
                        onChange={searchBarOnChange}
                        spellCheck={false}
                        placeholder={`Search`}
                        aria-placeholder={`Search`}
                        type={`text`}
                        className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all 
                        ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-xs rounded-md`}
                    />
                </div>
                <button
                    onClick={buttonOnClick}
                    title={title}
                    className='w-12 hover:bg-zinc-600 hover:text-white rounded-md transition-colors hover:shadow-lg
                    border border-zinc-200'>
                    <FontAwesomeIcon icon={faAdd} size={'sm'} />
                </button>
            </div>
        </nav>
    )
}
