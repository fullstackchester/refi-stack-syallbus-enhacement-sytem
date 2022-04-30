import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref } from 'firebase/database'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'

export default function Files() {

    const { currentUser } = useFirebase()
    const [syllabus, setSyllabus] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getSyllabus = onValue(ref(database, `posts`), snapshot => {
            setSyllabus(Object.values(snapshot.val()))
        })

        return getSyllabus
    }, [])


    return (
        <div className='h-auto'>
            <header className='h-14  flex flex-row justify-between px-10 border bg-white sticky top-12'>
                <span className='text-xl flex items-center font-medium text-zinc-600 '>{`My Files`}</span>
                <div className='h-full w-auto min-w-[20rem] flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent mr-2">
                        <input
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`}
                            className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all 
                        ring-2 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-sm rounded-md`}
                        />

                    </div>
                    <button
                        className='w-14 hover:bg-zinc-600 hover:text-white rounded-md transition-colors hover:shadow-lg'>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </div>
            </header>

            <main className='h-auto px-10 py-5 grid grid-cols-3 gap-2 '>
                {syllabus && syllabus
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                        && val.includes(currentUser.uid)))
                    .map((val, key) =>
                        <div
                            key={key}
                            className='col-span-1 h-auto min-h-[250px] bg-white border border-zinc-200
                             rounded-md flex flex-col p-4'>
                            <div className={`flex-1 flex flex-col`}>
                                <h1 className='text-zinc-700 text-lg font-semibold'>
                                    <Link to={`/files/${val.postId}`} className={`hover:underline`} >{val.postTitle}</Link>
                                </h1>
                                <span className={`text-xs font-medium text-zinc-500`}>{`Posted: ${val.postDate}`}</span>
                            </div>
                            <div className={`flex justify-end`}>
                                <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
                            </div>

                        </div>
                    )}
            </main>
        </div>
    )
}   