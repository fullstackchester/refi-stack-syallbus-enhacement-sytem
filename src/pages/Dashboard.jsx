import React, { useRef } from 'react'
import { useFirebase } from '../js/FirebaseContext'

function Dashboard() {

    const nameRef = useRef()
    const { currentUser } = useFirebase()

    function getName(e) {
        e.preventDefault()
        console.log(nameRef.current.value)
    }
    return (
        <div>

            <form
                onSubmit={getName}
            >
                <input
                    ref={nameRef}
                    defaultValue={currentUser.uid}
                    className='border border-zinc-300 p-4'
                    type={`text`} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Dashboard