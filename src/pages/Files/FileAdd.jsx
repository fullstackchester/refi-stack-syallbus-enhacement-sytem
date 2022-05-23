import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingButton from '../../components/LoadingButton'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { schoolYear, subjects } from '../../js/Data'
import Input from '../../components/Inputs/Input'


export default function FileAdd() {

    const titleRef = useRef()
    const descriptionRef = useRef()
    const fileRef = useRef()
    const acadYearRef = useRef()
    const subjectRef = useRef()
    const { writeData, uploadFile, currentUser } = useFirebase()
    const nav = useNavigate()
    const [name, setName] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

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

    const seletcs = [
        {
            label: 'Subject',
            id: 'select-subjects',
            ref: subjectRef,
            require: true,
            options: subjects
        },
        {
            label: 'School Year',
            id: 'select-school-year',
            ref: acadYearRef,
            require: true,
            options: schoolYear
        },
    ]

    function PublishPost(e) {
        e.preventDefault()
        const postId = uuidv4()
        const Post = {
            postId: postId,
            postStatus: 'Needs reviewing',
            postTitle: titleRef.current.value,
            postFile: fileRef.current.files[0].name,
            postFileUrl: `syllabus/${postId}/${fileRef.current.files[0].name}`,
            postDescription: descriptionRef.current.value,
            postDate: new Date().toLocaleString(),
            uid: currentUser.uid,
            syId: acadYearRef.current.value,
            subjectId: subjectRef.current.value,
            postAuthor: name,
        }
        // writeData('posts/', Post, Post.postId)
        //     .then(() => {
        //         uploadFile(fileRef.current.files[0], `syllabus/${Post.postId}/${fileRef.current.files[0].name}`)
        //             .then((snapshot) => {
        //                 console.log(snapshot)
        //                 nav('/files')
        //             }).catch((err) => {
        //                 setError(err.message)
        //             });
        //     }).catch((err) => {
        //         setError(err.message)
        //     });

        console.table(Post)
    }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm 
                text-zinc-600 p-2 font-semibold'>
                    <button type='button'
                        className='h-8 w-8 rounded-full hover:bg-zinc-100'
                        onClick={() => nav('/files')}>
                        <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                    </button>
                    <span className='font-semibold text-lg ml-3'>New Post</span>
                </header>
                <main className='flex-1 border-b border-zinc-100 flex justify-center'>
                    <form
                        id='create-post'
                        name='create-post'
                        spellCheck={false}
                        onSubmit={PublishPost}
                        className='grid grid-cols-4 gap-1 w-full h-full py-2 px-3 place-content-start'>
                        {AddPost.map((v, k) =>
                            <Input key={k} htmlFor={v.id} label={v.label} width={'col-span-2'}>
                                <input
                                    id={v.id}
                                    type={v.type}
                                    ref={v.ref}
                                    required={v.required}
                                    accept={v.accept && v.accept}
                                    className='h-14 bg-zinc-100 p-3 text-sm outline-none border border-transparent
                                    ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all'
                                    placeholder={v.placeholder} />
                            </Input>
                        )}
                        {seletcs.map((v, k) =>
                            <Input key={k} label={v.label} htmlFor={v.id} width={'col-span-2'}>
                                <select
                                    id={v.id}
                                    ref={v.ref}
                                    required={true}
                                    className='h-14 bg-zinc-100 p-3 text-sm outline-none border border-transparent 
                                    ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all'>
                                    <option value='' className='text-base'>Select</option>
                                    {v.options.map((val, key) => {
                                        if ('syId' in val) {
                                            return <option key={key} value={val.syId} className='text-base'>{val.syTitle}</option>
                                        } else {
                                            return <option key={key} value={val.subjectId} className='text-base'>{val.subjectTitle}</option>
                                        }
                                    })}
                                </select>
                            </Input>)}
                        <Input htmlFor={'post-description'} label={'Description'} width={'col-span-4'}>
                            <textarea
                                id='post-description'
                                ref={descriptionRef}
                                rows={8}
                                placeholder='Enter your description...'
                                className='w-full h-60 bg-zinc-100 p-3 text-sm outline-none border border-transparent
                                ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all resize-none' />
                        </Input>
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
