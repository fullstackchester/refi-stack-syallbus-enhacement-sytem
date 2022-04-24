import React from 'react'

export default function Searchbar(
    {
        onChange
    }
) {
    return (
        <div className="flex justify-center flex-1 bg-transparent mr-2">
            <input
                onChange={onChange}
                spellCheck={false}
                placeholder={`Search`}
                aria-placeholder={`Search`}
                type={`text`}
                className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all
                ring-2 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-xs rounded-md`}
            />
        </div>
    )
}
