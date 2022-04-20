import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../js/FirebaseContext'

export default function ViewPost() {


    const postId = useParams()
    const [post, setPost] = useState({})
    const { currentUser } = useFirebase()

    useEffect(() => {
        const getPost = onValue(ref(database, `posts/${postId.postId}`), postData => {
            if (postData.exists()) {
                setPost(postData.val())
            } else {
                setPost('POST NOT FOUND')
            }

        })

        return getPost
    }, [])

    useEffect(() => {
        const getProfile = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
            if (snapshot.exists()) {
                console.table(snapshot.val())
            } else {
                console.log('User not found')
            }
        })
        return getProfile
    }, [])

    return (
        <div className='w-full h-auto flex justify-center items-center py-5 px-10'>
            <main className='w-[80%] h-auto  min-h-[85vh] bg-white  rounded-md  grid grid-cols-3 grid-rows-6'>
                <div className='col-span-3 row-span-1 px-5 py-3 flex flex-col border-b border-zinc-200'>
                    <h3 className='text-2xl font-medium text-zinc-700'>{post.postTitle}</h3>
                    <h6 className='text-xs font-medium text-zinc-700'>{`Posted: ${post.postDate}`}</h6>

                </div>
                <div className='col-span-1 row-span-5 border-r border-zinc-200 text-zinc-700'>
                    <div className='h-1/2 w-full border-b border-zinc-300 p-3 flex flex-col '>
                        <span className='text-sm font-semibold'>{`Attachments`}</span>
                        <div className='flex-1 flex flex-col items-center justify-center '>
                            <FontAwesomeIcon
                                icon={faFileWord}
                                className=' text-3xl '
                            />
                            <span className='text-sm font-medium hover:underline cursor-pointer'>{post.postFile}</span>
                        </div>
                    </div>
                    <div className='h-1/2 w-full p-3 flex flex-col '>
                        <span className='text-sm font-semibold'>{`History`}</span>


                    </div>
                </div>
                <div className='col-span-2 row-span-5 flex flex-col '>
                    <div className='w-full h-fit border-b  border-zinc-200  p-2'>
                        <span className='text-sm text-zinc-400'>Comments</span>

                    </div>
                    <div className=' flex-1'>


                    </div>
                    <div className='h-14 border-t border-zinc-200'>

                    </div>

                </div>
            </main>
        </div>
    )
}
