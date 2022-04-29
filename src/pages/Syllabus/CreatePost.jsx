import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import LoadingButton from '../../components/LoadingButton'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'

export default function CreatePost() {

    const idRef = useRef()
    const titleRef = useRef()
    const postStatusRef = useRef()
    const descriptionRef = useRef()
    const authorRef = useRef()
    const fileRef = useRef()
    const { writeData, uploadFile, currentUser } = useFirebase()
    const nav = useNavigate()
    const [name, setName] = useState()
    const [error, setError] = useState('Failed to write data')
    useEffect(() => {
        return onValue(ref(database, `users/${currentUser.uid}`), user => {
            if (user.exists()) {
                setName(user.val().name)
            } else {
                setName(`User not found`)
            }
        })
    })

    const AddPost = [
        {
            id: 'post-id',
            label: '',
            type: 'hidden',
            defaultValue: uuidv4(),
            placeholder: '',
            ref: idRef,
            required: true,
        },
        {
            id: 'post-status',
            label: '',
            type: 'hidden',
            defaultValue: 'Needs reviewing',
            placeholder: '',
            ref: postStatusRef,
            required: true,
        },

        {
            id: 'post-author',
            label: '',
            type: 'hidden',
            defaultValue: '',
            placeholder: '',
            ref: authorRef,
            required: true,
        },
        {
            id: 'post-title',
            label: 'Post title',
            type: 'text',
            defaultValue: '',
            placeholder: 'Introduction to Computing Syllabi S.Y.21-22',
            ref: titleRef,
            required: true,
        },
        {
            id: 'syllabus-file',
            label: 'Syllabi File',
            type: 'file',
            defaultValue: '',
            placeholder: '',
            ref: fileRef,
            accept: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            required: true,
        },
        {
            id: 'syllabus-description',
            label: 'Description',
            type: 'text',
            defaultValue: '',
            placeholder: '',
            ref: descriptionRef,
            required: false,
        },
    ]


    function PublishPost(e) {
        e.preventDefault()
        const Post = {
            postId: idRef.current.value,
            postStatus: postStatusRef.current.value,
            postTitle: titleRef.current.value,
            postFile: fileRef.current.files[0].name,
            postFileUrl: `syllabus/${idRef.current.value}/${fileRef.current.files[0].name}`,
            postDescription: descriptionRef.current.value,
            postDate: new Date().toLocaleString(),
            uid: currentUser.uid,
            postAuthor: name,
        }
        writeData('posts/', Post, Post.postId)
            .then(() => {
                uploadFile(fileRef.current.files[0], `syllabus/${Post.postId}/${fileRef.current.files[0].name}`)
                    .then(() => {
                        nav('/posts')
                    }).catch((err) => {
                        setError(err.message)
                        console.log(err)
                    });
            }).catch((err) => {
                setError(err.message)
                console.log(err)
            });
    }


    return (
        <div className='w-full h-auto py-5 px-10 flex justify-center'>
            <div className='w-[80%] h-auto min-h-[600px] border border-zinc-200 bg-white rounded-md'>
                <header className='h-16 border-b flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`New post`} </span>
                </header>
                <main className='flex-1 border-b border-zinc-200 flex justify-center'>
                    <form
                        id='create-post'
                        name='create-post'
                        spellCheck={false}
                        onSubmit={PublishPost}
                        className='min-h-[500px] w-full px-10'>

                        {AddPost && AddPost.map((val, key) => {
                            return (
                                <label
                                    key={key}
                                    htmlFor={val.id}
                                    className={`${val.type !== 'hidden' ? 'py-5 border-b border-zinc-100' : ''}
                                     w-full h-auto flex flex-row`}>
                                    <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>
                                        {val.label}
                                    </span>
                                    <input
                                        id={val.id}
                                        ref={val.ref}
                                        required={val.required}
                                        type={val.type}
                                        accept={val.accept && val.accept}
                                        defaultValue={val.defaultValue}
                                        placeholder={val.placeholder}
                                        className='border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 
                                        text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'/>
                                </label>
                            )
                        })}
                    </form>

                </main>
                <footer className='h-14 flex items-center justify-end px-10'>
                    {error &&
                        <div className=' text-red-600'>
                            <FontAwesomeIcon icon={faWarning} className='mr-2 text-xs' />
                            <span className='text-sm font-medium'>{`Error: ${error}`}</span>
                        </div>
                    }

                    <LoadingButton
                        form={`create-post`}
                        type={`submit`}
                        title={`Publish`} />
                </footer>
            </div>
        </div>
    )
}
