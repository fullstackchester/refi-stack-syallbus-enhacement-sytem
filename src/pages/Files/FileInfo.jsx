import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { onValue, ref } from 'firebase/database'
import { database, storage } from '../../js/Firebase'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import PostStatus from '../../components/PostStatus'
import Button from '../../components/Template/Button'
import Confirm from '../../components/PopConfirmation'
import PopNotif from '../../components/PopNotif'
import { useFirebase } from '../../js/FirebaseContext'

export default function FileInfo() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [fileUrl, setFileUrl] = useState()
    const [subject, setSubject] = useState()

    const [isOpen, setOpen] = useState(false)
    const [actionDone, setActionDone] = useState(false)

    const { deleteFile, deleteData } = useFirebase()

    const nav = useNavigate()

    useEffect(() => {
        return onValue(ref(database, `/posts/${id}`), snapshot => {
            if (snapshot.exists()) {
                setPost(snapshot.val())
                onValue(ref(database, `subject/${snapshot.val().subjectId}`), snapshot => {
                    if (snapshot.exists()) {
                        setSubject(snapshot.val().subjectTitle)
                    } else {
                        setSubject('Subject not found')
                    }
                })
                getDownloadURL(storageRef(storage, snapshot.val().postFileUrl))
                    .then((url) => {
                        setFileUrl(url)
                    })
                    .catch((e) => {
                        console.log(e)
                    });
            }
        })
    }, [])

    function DeletePost(e) {
        e.preventDefault()

        deleteFile(post.postFileUrl)
            .then(() => {
                deleteData(`history/${id}`)
                    .then(() => {
                        deleteData(`comments/${id}`)
                            .then(() => {
                                deleteData(`posts/${id}`)
                                    .then(() => {
                                        setOpen(false)
                                        setActionDone(true)
                                    }).catch((err) => {
                                        setActionDone(true)
                                        console.log(err)
                                    });
                            }).catch((err) => {
                                setActionDone(true)
                                console.log(err)
                            });
                    }).catch((err) => {
                        setActionDone(true)
                        console.log(err)
                    });
            }).catch((err) => {
                setActionDone(true)
                console.log(err)
            });
    }

    return (
        <>
            <Confirm
                isOpen={isOpen}
                dedicatedFunction={DeletePost}
                handleClose={() => setOpen(false)}
                dialogTitle='Confirm Delete'
                dialogMessage={`Are you sure you want to delete Post ${post.postTitle}?`}
                buttonTitle='Delete' />

            <PopNotif
                isOpen={actionDone}
                handleClose={() => {
                    setActionDone(false)
                    nav('/files')
                }}
                dialogTitle='Delete Successful'
                dialogMessage='Post deleted successfully' />

            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                Information
            </div>
            <div className='flex-1 px-5 pb-3 overflow-y-auto'>
                <div className='flex flex-row items-start justify-between bg-white py-3 sticky top-0'>
                    <span className='text-lg text-zinc-700 font-semibold flex-1'>{post.postTitle}</span>
                    <PostStatus postStatus={post.postStatus} textSize={'text-xs'} />
                </div>
                <p className='min-h-[5rem] text-sm text-zinc-600 mt-2 whitespace-pre-line indent-10 mb-5'>
                    {post.postDescription}
                </p>
                <div className='border-t border-zinc-100 min-h-[15rem] text-sm text-zinc-600 flex flex-col py-3'>

                    <div className='flex flex-row '>
                        Attachements:
                        <span
                            onClick={() => {
                                window.open(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(fileUrl)}`, '_blank')
                            }}
                            className='font-medium ml-1 hover:underline cursor-pointer'>
                            {post.postFile}
                        </span>
                    </div>
                    <div className='flex flex-row '>
                        Subject: <Link to={`/subjects/${post.subjectId}`} className='ml-1 font-medium hover:underline'>{subject}</Link>
                    </div>
                    <div className='flex flex-row '>{`Posted: ${post.postDate}`}</div>
                </div>
            </div>
            <div className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>
                <Button title='Delete' color='red' onClick={() => setOpen(true)} />
                <Button title='Edit Post' color='sky' onClick={() => nav(`/files/edit-post/${id}`)} />
            </div>
        </>
    )
}
