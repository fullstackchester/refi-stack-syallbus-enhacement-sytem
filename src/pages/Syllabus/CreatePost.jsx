import React, { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {

    const idRef = useRef()
    const titleRef = useRef()
    const postStatusRef = useRef()
    const descriptionRef = useRef()
    const authorRef = useRef()
    const fileRef = useRef()
    const { writeData, uploadFile } = useFirebase()
    const nav = useNavigate()

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
            defaultValue: 'to-be-reviewed',
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
            id: 'syllabus-title',
            label: 'Syllabus title',
            type: 'text',
            defaultValue: '',
            placeholder: 'Introduction to Computing',
            ref: titleRef,
            required: true,
        },
        {
            id: 'syllabus-file',
            label: 'File',
            type: 'file',
            defaultValue: '',
            placeholder: '',
            ref: fileRef,
            accept: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            required: true,
        },
    ]
    const [error, setError] = useState()

    function PublishPost(e) {
        e.preventDefault()
        const Post = {
            postId: idRef.current.value,
            postStatus: postStatusRef.current.value,
            postTitle: titleRef.current.value,
            postFile: fileRef.current.files[0].name,
            postFileUrl: `syllabus/${idRef.current.value}/${fileRef.current.files[0].name}`,
            postDescription: descriptionRef.current.value,
            postDate: new Date().toLocaleString()
        }
        writeData('posts/', Post, Post.postId)
            .then(() => {
                uploadFile(fileRef.current.files[0], `syllabus/${Post.postId}/${fileRef.current.files[0].name}`)
                    // 'syllabus/' + Post.postId + '/' + fileRef.current.files[0].name
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
                <header className='h-16 border-b border-zinc-200'>

                </header>
                <main className='h-auto border-b border-zinc-200 p-4 flex justify-center'>
                    <form
                        id='create-post'
                        spellCheck={false}
                        onSubmit={PublishPost}
                        className='h-auto  min-h-[500px] w-full p-5'>

                        {AddPost && AddPost.map((val, key) => {
                            return (
                                <label
                                    key={key}
                                    htmlFor={val.id}
                                    className='flex flex-row'>
                                    <span className='w-2/6 font-medium text-gray-700'>
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
                                        className='w-full p-3 border border-gray-400 outline-none rounded-sm ring-1 ring-transparent
                                         focus:border-sky-400 focus:ring-sky-400 mb-8' />
                                </label>
                            )
                        })}
                        <label
                            htmlFor={`description`}
                            className='flex flex-row'>
                            <span className='w-2/6 font-medium text-gray-700'>
                                {`Description`}
                            </span>
                            <textarea
                                id={`description`}
                                ref={descriptionRef}
                                required={true}
                                rows={8}
                                defaultValue={``}
                                placeholder={`Enter your description here...`}
                                className='w-full p-3 border border-gray-400 outline-none block rounded-sm ring-1 ring-transparent focus:border-sky-400 focus:ring-sky-400 mb-5 resize-none' />
                        </label>
                    </form>

                </main>
                <footer className='h-12 flex justify-end'>
                    <span>{error}</span>
                    <button
                        form='create-post'
                        className='bg-zinc-800 text-white text-xs px-3 rounded-br-md hover:bg-zinc-700 
                        border border-transparent'>Publish post</button>
                </footer>

            </div>
        </div>
    )
}
