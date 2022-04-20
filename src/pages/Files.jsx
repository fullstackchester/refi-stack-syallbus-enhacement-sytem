import React, { Fragment, useState, useRef } from 'react'

import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../js/Firebase'
import Alert from '../components/Alert'

export default function Files() {

    const [err, setErr] = useState()
    const [file, setFile] = useState(null)
    const fileRef = useRef()

    function uploadFile(e) {
        e.preventDefault()
        // if (file !== null) {
        //     uploadBytes(ref(storage, 'Syllabus/' + file))
        //         .then((result) => {
        //             setErr('upload complete')
        //             setFile(null)
        //         })
        //         .catch((err) => setErr(err.message));
        // } else {
        //     setErr('Select a file first')
        // }
        console.log(fileRef.current.value)


    }
    return (
        <div className='w-full h-[600px] flex justify-center items-center border border-red-600'>
            <form
                onSubmit={uploadFile}
                className='w-[400px] h-auto p-5 border border-zinc-200'>
                <input
                    // onChange={(e) => setFile(e.target.value)}
                    ref={fileRef}
                    className='h-20 w-90 border border-zinc-600 p-2'
                    type={`text`} />

                {err && <Alert alertMsg={err} />}

                <button
                    type='submit'
                    className='p-3 bg-zinc-700' >Upload</button>
            </form>
        </div>

    )
}   