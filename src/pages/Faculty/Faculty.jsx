import React, { useState, useEffect } from 'react'
import { get, onValue, orderByChild, orderByValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser, faUserCog, faSearch } from '@fortawesome/free-solid-svg-icons'
import Node from '../../components/Node'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'


function Faculty() {

    const [faculty, setFaculty] = useState([])
    const [search, setSearch] = useState('')
    const nav = useNavigate()

    useEffect(() => {

        const getFaculty = onValue(ref(database, 'users'), snapshot => {
            return setFaculty(Object.values(snapshot.val()))
        })

        return getFaculty
    }, [])

    return (
        <div className='w-full h-auto'>
            <Navbar
                headerTitle={`Faculty`}
                searchBarOnChange={(e) => setSearch(e.target.value)}

            />
            <main className=' h-auto py-5 px-10 grid grid-cols-12 gap-2'>
                {faculty && faculty
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                        && val.toLowerCase().includes(search.toLowerCase())))
                    .map((val, key) => {
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