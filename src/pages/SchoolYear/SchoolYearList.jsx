import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'


export default function SchoolYearList() {
    const [search, setSearch] = useState('')
    const nav = useNavigate()
    return (
        <div className={`w-full h-auto`}>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
                <span className='text-lg flex items-center font-medium text-zinc-600 '>School Year</span>
                <div className='h-full w-auto min-w-[20rem] flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent mr-2">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`}
                            className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all 
                        ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-sm rounded-md`}
                        />
                    </div>
                    <button
                        onClick={() => nav(`/school-year/add`)}
                        className='w-14 hover:bg-zinc-600 hover:text-white rounded-md transition-colors hover:shadow-lg'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </nav>
            <div className={`w-full h-auto min-h-[85vh] border border-zinc-400`}>

            </div>

        </div>
    )
}
