import React, { useState, useEffect } from 'react'
import { get, onValue, orderByChild, orderByValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser, faUserCog, faSearch } from '@fortawesome/free-solid-svg-icons'
import Node from '../../components/Node'
import { useNavigate } from 'react-router-dom'


function Faculty() {

    const [faculty, setFaculty] = useState([])
    const [search, setSearch] = useState()
    const nav = useNavigate()

    useEffect(() => {

        const getFaculty = onValue(ref(database, 'users'), snapshot => {
            return setFaculty(Object.values(snapshot.val()))
        })

        return getFaculty
    }, [])
    function getSearch() {
        
    }

    return (
        <div className='w-full h-auto'>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white'>
                <span className='text-xl flex items-center font-medium text-zinc-600 '>Faculty</span>
                <div className='h-full w-auto min-w-[20rem] border-red-600 flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent border border-zinc-200 rounded-md mr-2">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`} className={`outline-none border border-transparent bg-transparent flex-1 px-3
                            ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-200 text-sm rounded-tl-md rounded-bl-md`} />
                        <button
                            onClick={getSearch}
                            className='w-12 hover:bg-zinc-600 hover:text-white transition-colors border-l border-zinc-300 text-sm
                            hover:border-zinc-600 last:rounded-tr-md rounded-br-md'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            nav('/subjects/add')
                        }}
                        className='w-14 hover:bg-zinc-600 hover:text-white rounded-md transition-colors'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </nav>
            <main className=' h-auto py-5 px-10 grid grid-cols-12 gap-2'>
                {faculty && faculty.map((val, key) => {
                    return (
                        <Node
                            key={key}
                            link={`/faculty/${val.uid}`}
                            title={val.name}
                            subTitle={val.email}
                            icon={val.userType === 'administrator' ? faUserCog : faUser}
                        />
                    )
                })}
            </main>

        </div>
    )
}

export default Faculty