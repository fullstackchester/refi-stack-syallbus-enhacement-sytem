import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from '../../components/CommentSection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'


export default function Comments() {
    const { postId } = useParams()
    const [user, setUser] = useState()
    const { currentUser } = useFirebase()
    const commentRef = useRef()
    const uid = currentUser.uid

    useEffect(() => {

        return onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setUser(snap.val())
            }
        })
    }, [])

    function writeComment(e) {
        e.preventDefault()
        const userComment = {
            postId: postId,
            commentId: uuidv4(),
            commentString: commentRef.current.value,
            commentDate: new Date().toLocaleString(),
            uid: user ? user.uid : '',
            name: user ? user.name : ''
        }
        set(ref(database, `comments/${postId}/${userComment.commentId}`), userComment)
            .then(() => {

            }).catch((err) => {
                console.log(err)
            });
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
