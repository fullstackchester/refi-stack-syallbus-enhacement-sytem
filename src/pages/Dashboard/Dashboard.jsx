import React, { useRef, useState } from 'react'


function Dashboard() {
    const fileRef = useRef()
    const [lastDate, setDate] = useState('')

    function getMetaData(e) {
        e.preventDefault()
        console.table(fileRef.current.files[0])
        setDate(fileRef.current.files[0].lastModified)
    }

    return (
        <div className='w-full h-[600px] border border-red-600 flex justify-center items-center'>

            <form
                onSubmit={getMetaData}>
                <input ref={fileRef} type={`file`} />
                <button type={`submit`}>
                    Check
                </button>
            </form>
            <span className={`text-sm font-medium`}>{new Date(lastDate).toLocaleString()}</span>
        </div>

    )
}

export default Dashboard