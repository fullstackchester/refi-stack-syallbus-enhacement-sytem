import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
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
    const acadYearRef = useRef()
    const subjectRef = useRef()
    const { writeData, uploadFile, currentUser } = useFirebase()
    const nav = useNavigate()
    const [name, setName] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [schoolyear, setSY] = useState([])
    const [subs, setSubs] = useState([])

    useEffect(() => {
        return onValue(ref(database, `users/${currentUser.uid}`), user => {
            if (user.exists()) {
                setName(user.val().name)
            } else {
                setName(`User not found`)
            }
        })
    })

    useEffect(() => {
        onValue(ref(database, `schoolYear`), sy => {
            if (sy.exists()) {
                setSY(Object.values(sy.val()))
            }
        })
        onValue(ref(database, `subject`), subjects => {
            if (subjects.exists()) {
                setSubs(Object.values(subjects.val()))
            }
        })


    }, [])



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
    ]


    function PublishPost(e) {
        e.preventDefault()
        setLoading(true)
        const Post = {
            postId: idRef.current.value,
            postStatus: postStatusRef.current.value,
            postTitle: titleRef.current.value,
            postFile: fileRef.current.files[0].name,
            postFileUrl: `syllabus/${idRef.current.value}/${fileRef.current.files[0].name}`,
            postDescription: descriptionRef.current.value,
            postDate: new Date().toLocaleString(),
            uid: currentUser.uid,
            syId: acadYearRef.current.value,
            subjectId: subjectRef.current.value,
            postAuthor: name,
        }
        writeData('posts/', Post, Post.postId)
            .then(() => {
                uploadFile(fileRef.current.files[0], `syllabus/${Post.postId}/${fileRef.current.files[0].name}`)
                    .then((snapshot) => {
                        console.log(snapshot)
                        nav('/posts')
                    }).catch((err) => {
                        setError(err.message)
                    });
            }).catch((err) => {
                setError(err.message)
            });
    }


    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md'>
                <header className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm 
                text-zinc-600 p-2 font-semibold'>
                    <button type='button'
                        className='h-8 w-8 rounded-full hover:bg-zinc-100'
                        onClick={() => nav('/posts')}>
                        <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                    </button>
                    <span className='font-semibold text-lg ml-3'>New Post</span>
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
                        <label
                            className={`py-5 border-b border-zinc-100 w-full h-auto flex flex-row`}
                            htmlFor='academic-year'>
                            <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>Academic Year</span>
                            <select
                                required={true}
                                ref={acadYearRef}
                                className='border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 
                                text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300' id='academic-year'>
                                <option value={''} className='text-sm p-1'> Select School Year </option>
                                {schoolyear && schoolyear.map((val, key) => {
                                    return (
                                        <option key={key} value={val.syId} className='text-sm p-1'> {val.syTitle} </option>
                                    )
                                })}
                            </select>
                        </label>
                        <label
                            className={`py-5 border-b border-zinc-100 w-full h-auto flex flex-row`}
                            htmlFor='academic-year'>
                            <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>Subject</span>
                            <select
                                required={true}
                                ref={subjectRef}
                                className='border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 
                                text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300' id='academic-year'>
                                <option value={''} className='text-sm p-1'> Select Subject </option>
                                {subs.length !== 0 ? subs.map((val, key) => {
                                    return (
                                        <option key={key} value={val.subjectId} className='text-sm p-1'> {val.subjectTitle} </option>
                                    )
                                }) : <option>No Subjects Available</option>}
                            </select>
                        </label>
                        <label
                            className={`py-5 border-b border-zinc-100 w-full h-auto flex flex-row`}
                            htmlFor='syllabus-description'>
                            <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>Description</span>
                            <textarea
                                id='syllabus-description'
                                ref={descriptionRef}
                                rows={8}
                                placeholder='Enter your description...'
                                className='border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 
                                text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300 resize-none' />
                        </label>
                    </form>

                </main>
                <footer className='h-14 flex items-center justify-end px-10'>
                    {error &&
                        <div className=' text-red-600'>
                            <span className='text-xs font-medium'>{`Error: ${error}`}</span>
                        </div>
                    }

                    <LoadingButton
                        loadingState={loading}
                        form={`create-post`}
                        type={`submit`}
                        title={`Publish`} />
                </footer>
            </div>
        </div>
    )
}
