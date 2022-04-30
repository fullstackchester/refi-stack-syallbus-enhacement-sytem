import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { database, storage } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import Comments from '../../components/CommentSection'
import { v4 as uuidv4 } from 'uuid'
import Status from '../../components/SetStatus'
import { getDownloadURL, ref as StorageRef } from 'firebase/storage'
import PostStatus from '../../components/PostStatus'
import History from '../../components/HistorySection'

export default function ViewPost() {


    const postId = useParams()
    const [post, setPost] = useState({})
    const { currentUser, } = useFirebase()
    const [comment, setComment] = useState()
    const [user, setUser] = useState({})

    const commentRef = useRef()

    useEffect(() => {
        onValue(ref(database, `posts/${postId.postId}`), postData => {
            if (postData.exists()) {
                setPost(postData.val())
            } else {
                setPost('POST NOT FOUND')
            }
        })
    }, [])

    useEffect(() => {
        return onValue(ref(database, `users/${currentUser.uid}`), faculty => {
            if (faculty.exists()) {
                setUser(faculty.val())
            }
        })
    }, [])

    function PostComment(e) {
        e.preventDefault()
        const userComment = {
            postId: post.postId,
            commentId: uuidv4(),
            commentString: comment,
            commentDate: new Date().toLocaleString(),
            uid: user ? user.uid : '',
            name: user ? user.name : ''
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
                window.open(url)
            }).catch((err) => {
                alert(err.message)
            });
    }


    return (
        <div className='w-full h-auto flex justify-center items-center py-5 px-10'>
            <main className='w-[80%] h-auto min-h-[85vh] bg-white  rounded-md flex flex-col'>
                <div
                    className='px-5 py-4 border-b border-zinc-200 text-zinc-700 grid grid-cols-4 flex-1'>
                    <div className='col-span-3 overflow-hidden flex flex-col'>
                        <div className='h-8 w-full text-lg font-semibold flex flex-row items-center'>
                            {post.postTitle}<PostStatus postStatus={post.postStatus} textSize={`text-xs font-normal`} />
                        </div>
                        <div className='text-xs text-zinc-600 font-semibold'>
                            Author: <Link to={`/faculty/${post.uid}`} className='text-sky-600 hover:underline cursor-pointer'>{post.postAuthor} </Link>
                        </div>
                        <div className='text-xs text-zinc-600 font-semibold '>
                            {`Attachments: `}<Link to={``} className={`hover:underline text-sky-600`}>{post.postFile}</Link>
                        </div>
                        <div className='text-xs text-zinc-600 font-semibold'>{`Posted: ${post.postDate}`} </div>
                        <div className='text-sm text-zinc-600 mt-2'>{post.postDescription} </div>
                    </div>
                    <div className='col-span-1 flex flex-col'>
                        <Status post={post} />
                    </div>
                </div>
                <div className='w-full h-[400px] flex flex-row'>
                    <div className={`w-1/3 border-r border-zinc-200 flex flex-col`}>
                        <div className='w-full h-auto p-1 text-xs text-zinc-500 border-b border-zinc-100'>
                            Edit History
                        </div>
                        <div className='flex-1 overflow-y-auto'>
                            <History postId={postId.postId} />
                        </div>
                    </div>
                    <div className='w-2/3 flex flex-col '>
                        <div className='w-full h-auto p-1 text-xs text-zinc-500 border-b border-zinc-100'>
                            Comments
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
                </div>


            </main>
        </div>
    )
}
