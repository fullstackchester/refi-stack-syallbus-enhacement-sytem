import React, { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faUser, faUserCog } from '@fortawesome/free-solid-svg-icons'
import Node from '../../components/Node'


function Faculty() {

    const [faculty, setFaculty] = useState([])

    useEffect(() => {

        const getFaculty = onValue(ref(database, 'users'), snapshot => {
            return setFaculty(Object.values(snapshot.val()))
        })

        return getFaculty
    }, [])


    return (
        <div className='w-full h-screen'>
            <header className='h-14  grid grid-cols-4 sticky top-12 bg-zinc-100'>
                <h1 className='col-span-2 text-md font-medium text-zinc-700 flex items-center py-2 px-4 border border-sky-600'>Faculty</h1>
                <div className='col-span-2 grid grid-cols-8 border border-red-600'>
                    <div className='col-span-4 border-r border-green-600'>
                        {/* <Searchbar /> */}
                    </div>
                    <button className=' text-xl text-zinc-700'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </header>
            <main className=' h-auto p-4 grid grid-cols-12 gap-2'>
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