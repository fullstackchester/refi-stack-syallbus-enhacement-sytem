import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Comments from '../../components/CommentSection'
import LoadingButton from '../../components/LoadingButton'
import PostStatus from '../../components/PostStatus'
import { database } from '../../js/Firebase'

export default function ViewFile() {

    const postId = useParams()
    const nav = useNavigate()
    const [post, setPost] = useState({})
    const [commentCount, setCount] = useState(0)
    useEffect(() => {
        return onValue(ref(database, `posts/${postId.id}`), post => {
            if (post.exists()) {
                setPost(post.val())
            } else {
                alert('data not found')
            }
        })
    }, [])
    useState(() => {
        return onValue(ref(database, `comments/${postId.id}`), comments => {
            setCount(comments.size)
        })
    }, [])
    console.log(commentCount)
    return (
        <div className='w-full h-auto flex justify-center items-center py-5 px-10'>
            <main className='w-[80%] h-auto bg-white rounded-md border border-zinc-200 flex flex-col'>
                <div className='h-auto w-full py-5 px-10'>
                    <div className={`text-2xl text-zinc-700 font-semibold flex flex-row items-center`}>
                        {post.postTitle} <PostStatus postStatus={post.postStatus} textSize={`text-xs`} />
                    </div>
                    <div className={`py-2 text-xs font-semibold text-zinc-600`}>
                        {`Attachments:`} <Link className={`hover:underline`} to={``}>{post.postFile}</Link>
                        <p className={`text-xs text-zinc-500`}>{`Posted: ${post.postDate}`} </p>
                    </div>
                    <p className={`text-sm text-zinc-600`}>{post.postDescription} </p>
                </div>
                <div className={`h-[300px] grid grid-cols-3 border-t border-zinc-200`}>
                    <div className={`col-span-1  bg-zinc-50`}>
                        <div className={`p-1 text-xs text-zinc-600`}>Edit history</div>
                    </div>
                    <div className={`col-span-2 border-l border-zinc-200 overflow-y-auto`}>
                        <div className={`p-1 text-xs text-zinc-600`}>
                            {`Comments ${String.fromCharCode(8226)} ${commentCount}`}
                        </div>
                        <div className='px-5 '>
                            <Comments postId={postId.id} />
                        </div>
                    </div>
                </div>
                <div className={`h-14 border-t border-zinc-200 flex px-5 justify-end items-center`}>
                    <LoadingButton
                        title={`Edit post`}
                        dedicatedFunc={(e) => {
                            e.preventDefault()
                            nav(`/files/edit/${postId.id}`)
                        }} />
                </div>
            </main>
        </div>
    )
}
