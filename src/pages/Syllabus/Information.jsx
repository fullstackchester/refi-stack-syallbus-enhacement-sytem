import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database, storage } from '../../js/Firebase'
import SetStatus from '../../components/SetStatus'
import { getBlob, getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useFirebase } from '../../js/FirebaseContext'

export default function Information() {

    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [fileUrl, setFileUrl] = useState()
    const { isAdmin, isAreaChair } = useFirebase()
    const [subject, setSubject] = useState()



    useEffect(() => {
        return onValue(ref(database, `/posts/${postId}`), snapshot => {
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

    useEffect(() => {

    }, [])



    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                Information
                {!isAdmin && !isAreaChair ? <></> : <SetStatus postId={postId} />}
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
                        Author:
                        <Link to={`/faculty/${post.uid}`}
                            className='font-medium ml-1 hover:underline'>
                            {post.postAuthor}
                        </Link>
                    </div>
                    <div className='flex flex-row '>
                        Attachements:
                        {/*  Hours wasted on file preview from firebase storage to browser: 4hrs+ */}
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
        </>
    )
}
