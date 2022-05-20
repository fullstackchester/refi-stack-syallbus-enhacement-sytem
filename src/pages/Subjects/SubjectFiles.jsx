import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faFolderOpen } from '@fortawesome/free-solid-svg-icons'


export default function SubjectFiles() {

    const { id } = useParams()
    const [post, setPost] = useState([])
    const { role } = useFirebase()
    let subjectFiles = []

    useEffect(() => {
        onValue(ref(database, `posts`), snap => {
            if (snap.exists()) {
                setPost(Object.values(snap.val()))
            }
        })
    }, [])

    post.forEach(file => {
        if (file.subjectId == id) {
            subjectFiles.push(file)
        }
    })

    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                {`Files ${String.fromCharCode(183)} ${subjectFiles.length}`}
            </div>
            {role === 'faculty' ?
                <div className='flex-1 overflow-y-auto grid place-items-center place-content-center'>
                    <div className='text-zinc-600 flex flex-col'>
                        <FontAwesomeIcon icon={faUserShield} size='4x' />
                        <h1 className='text-lg font-semibold text-center'>Restricted</h1>
                        <span className='text-sm'>Your account has no access to these files.</span>
                    </div>
                </div> :
                subjectFiles.length !== 0 ?
                    <div className='flex-1 overflow-y-auto '>
                        {subjectFiles
                            .map((v, k) =>
                                <Link key={k} to={`/posts/${v.postId}`}>
                                    <div
                                        className='h-16 border-b border-zinc-200 p-2 hover:underline hover:bg-zinc-100
                                transition-colors'>
                                        <div className='text-sm text-zinc-700 font-semibold'>{v.postTitle}</div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                    :
                    <div className='flex-1 overflow-y-auto grid place-content-center place-items-center' >
                        <div className='flex flex-col text-zinc-600'>
                            <FontAwesomeIcon icon={faFolderOpen} size='4x' />
                            <span className='text-lg font-semibold text-center'>No Files Found</span>
                        </div>
                    </div>
            }
        </>
    )
}
