import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { database, storage } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileWord } from '@fortawesome/free-solid-svg-icons'
import { useFirebase } from '../../js/FirebaseContext'
import Comments from '../../components/CommentSection'
import { v4 as uuidv4 } from 'uuid'
import Status from '../../components/SetStatus'
import { getDownloadURL, ref as StorageRef } from 'firebase/storage'

export default function ViewPost() {


    const postId = useParams()
    const [post, setPost] = useState({})
    const { currentUser } = useFirebase()
    const [comment, setComment] = useState()
    const commentRef = useRef()
    const [currentPostId, setCurrentPosId] = useState()

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

    // useEffect(() => {
    //     const getProfile = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
    //         if (snapshot.exists()) {
    //             console.table(snapshot.val())
    //         } else {
    //             console.log('User not found')
    //         }
    //     })
    //     return getProfile
    // }, [])

    function PostComment(e) {
        e.preventDefault()
        const userComment = {
            postId: post.postId,
            commentId: uuidv4(),
            commentString: comment,
            commentDate: new Date().toLocaleString(),
            uid: currentUser.uid
        }
        set(ref(database, `comments/${post.postId}/${userComment.commentId}`), userComment)
            .then(() => {
                commentRef.current.value = ''
            }).catch((err) => {
                alert(err.message)
            });
    }
    function DownloadSyllabi(e) {
        e.preventDefault()
        getDownloadURL(StorageRef(storage, post.postFileUrl))
            .then((url) => {
                console.log(url)
            }).catch((err) => {
                alert(err.message)
            });
    }

    return (
        <div className='w-full h-auto flex justify-center items-center py-5 px-10'>
            <main className='w-[80%] h-[85vh] bg-white  rounded-md  grid grid-cols-3 grid-rows-6 shadow-sm'>
                <div className='col-span-3 row-span-1 px-5 py-3 border-b border-zinc-200 text-zinc-700
                grid grid-cols-4'>
                    <div className='col-span-3'>
                        <h3 className='text-2xl font-medium  '>{post.postTitle}</h3>
                        <h6 className='text-xs font-medium'>{`Posted: ${post.postDate}`}</h6>
                    </div>
                    <div className='col-span-1 border-zinc-300 flex flex-col'>
                        <Status />
                        <div className='w-full flex-1 flex items-center justify-center'>
                            <span className='text-sm font-bold p-2 border'>{post.postStatus}</span>
                        </div>

                    </div>
                </div>

                <div className='col-span-1 row-span-5 border-r border-zinc-200 text-zinc-700'>
                    <div
                        onClick={DownloadSyllabi}
                        className='h-1/2 w-full border-b border-zinc-300 p-3 flex flex-col '>
                        <span className='text-sm font-semibold'>{`Attachments`}</span>
                        <div className='flex-1 flex flex-col items-center justify-center hover:bg-zinc-600
                         bg-opacity-60 hover:text-white transition-colors cursor-pointer '>

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
                    <div className='w-full h-10 p-2'>
                        <span className='text-sm text-zinc-400'>Comments</span>

                    </div>
                    <div className='flex-1 px-4 overflow-y-auto'>
                        <Comments postId={postId.postId} />
                    </div>
                    <div className='min-h-[3.5rem] h-auto border-t border-zinc-200 flex p-2'>
                        <form
                            onSubmit={PostComment}
                            className=' flex-1 flex'>
                            <input
                                required={true}
                                type={`text`}
                                ref={commentRef}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Enter your comments'
                                className='flex-1 p-2 text-sm outline-none border border-zinc-200 focus:border-sky-300
                                 resize-none ring-1 ring-transparent focus:ring-sky-300 rounded-md' />
                        </form>

                    </div>

                </div>
            </main>
        </div>
    )
}
