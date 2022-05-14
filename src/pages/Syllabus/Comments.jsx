import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from '../../components/CommentSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'


export default function Comments() {
    const { postId } = useParams()
    const commentRef = useRef()

    function writeComment(e) {
        e.preventDefault()
        const userComment = {
            postId: postId,
            commentId: uuidv4(),
            commentString: commentRef.current.value,
            commentDate: new Date().toLocaleString(),
            // uid: user ? user.uid : '',
            // name: user ? user.name : ''
        }
        console.table(userComment)
        commentRef.current.value = ''
    }
    return (
        <>
            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>Comments</div>
            <CommentSection postId={postId} />
            <div className='h-14 border-t border-zinc-100  p-2'>
                <form
                    onSubmit={writeComment}
                    spellCheck={false}
                    className='flex flex-row items-center' >
                    <input
                        required={true}
                        ref={commentRef}
                        placeholder='Enter your comments...'
                        type={'text'}
                        className='flex-1  outline-none border p-2 text-sm rounded-md' />
                    <button
                        type='submit'
                        className='h-8 w-8 rounded-full hover:bg-zinc-200 transition-colors ml-2'>
                        <FontAwesomeIcon icon={faPaperPlane} size={'sm'} />
                    </button>
                </form>
            </div>
        </>
    )
}
