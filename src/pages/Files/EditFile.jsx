import { onValue, ref, set, update } from 'firebase/database'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from '../../components/LoadingButton'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function EditFile() {
    const { uploadFile } = useFirebase()
    const nav = useNavigate()
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const authorRef = useRef()
    const fileRef = useRef()
    const inputStyle = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'

    useEffect(() => {
        return onValue(ref(database, `posts/${postId}`), post => {
            if (post.exists()) {
                setPost(post.val())
            }
        })
    })
    function updatePost(e) {
        e.preventDefault()
        setLoading(true)
        const currentPost = {
            postTitle: titleRef.current.value,
            postFile: fileRef.current.files[0].name,
            postDescription: descriptionRef.current.value,
            postStatus: 'Needs reviewing',
            postFileUrl: `syllabus/${post.postId}/${fileRef.current.files[0].name}`,
            postDate: new Date().toLocaleString()
        }
        console.table(currentPost)
        update(ref(database, `posts/${post.postId}`), currentPost)
            .then(() => {
                uploadFile(fileRef.current.files[0], `syllabus/${post.postId}/${fileRef.current.files[0].name}`)
                    .then(() => {
                        const history = {
                            historyId: uuidv4(),
                            historyDate: new Date().toLocaleString(),
                            previousPost: post
                        }
                        set(ref(database, `history/${post.postId}/${history.historyId}`), history)
                            .then(() => {
                                setLoading(false)
                                nav(`/files/${post.postId}`)
                            }).catch((err) => {
                                setLoading(false)
                                console.log(err)
                            });
                    }).catch((err) => {
                        console.log(err.message)
                        setLoading(false)
                    });
            }).catch((err) => {
                console.log(err.message)
                setLoading(false)
            });


    }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row items-center justify-left py-2 px-2 
                border-b border-zinc-100 text-zinc-700'>
                    <button type='button'
                        className='h-8 w-8 rounded-full hover:bg-zinc-100'
                        onClick={() => nav(-1)}>
                        <FontAwesomeIcon icon={faChevronLeft} size={'sm'} />
                    </button>
                    <span className='font-semibold text-lg ml-3'>Edit Post</span>
                </header>
                <main className='flex-1 border-b border-zinc-200 flex justify-center'>

                    <form
                        spellCheck={false}
                        onSubmit={updatePost}
                        name={`edit-post-form`}
                        id={`edit-post-form`}
                        className={`w-full px-10`}>
                        {
                            [
                                {
                                    id: 'post-author',
                                    label: '',
                                    type: 'hidden',
                                    defaultValue: post.postAuthor,
                                    placeholder: '',
                                    ref: authorRef,
                                    required: true,
                                },
                                {
                                    id: 'post-title',
                                    label: 'Post title',
                                    type: 'text',
                                    defaultValue: post.postTitle,
                                    placeholder: 'Introduction to Computing Syllabi S.Y.21-22',
                                    ref: titleRef,
                                    required: true,
                                },
                                {
                                    id: 'syllabus-file',
                                    label: 'Syllabi File',
                                    type: 'file',
                                    defaultValue: post.postFile,
                                    placeholder: '',
                                    ref: fileRef,
                                    accept: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                    required: true,
                                },
                                {
                                    id: 'syllabus-description',
                                    label: 'Description',
                                    type: 'textarea',
                                    defaultValue: post.postDescription,
                                    placeholder: '',
                                    ref: descriptionRef,
                                    required: false,
                                    rows: 8,
                                },
                            ].map((val, key) =>
                                <label
                                    key={key}
                                    htmlFor={val.id}
                                    className={`${val.type !== 'hidden' ? 'py-5 border-b border-zinc-100' : ''}
                                     w-full h-auto flex flex-row`}>
                                    <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>
                                        {val.label}
                                    </span>
                                    {val.type !== 'textarea' ?
                                        <input
                                            id={val.id}
                                            ref={val.ref}
                                            required={val.required}
                                            type={val.type}
                                            accept={val.accept && val.accept}
                                            defaultValue={val.defaultValue}
                                            placeholder={val.placeholder}
                                            className={`${val.type === 'textarea' ? ' resize-none' : ''} ${inputStyle}`}
                                        />
                                        :
                                        <textarea
                                            id={val.id}
                                            ref={val.ref}
                                            rows={val.rows}
                                            required={val.required}
                                            accept={val.accept && val.accept}
                                            defaultValue={val.defaultValue}
                                            placeholder={val.placeholder}
                                            className={`${inputStyle} ${val.type === 'textarea' ? ' resize-none' : ''}`}
                                        />
                                    }

                                </label>
                            )
                        }
                    </form>
                </main>
                <footer className='h-14 flex items-center justify-end px-10'>
                    <LoadingButton
                        loadingState={loading}
                        form={`edit-post-form`}
                        type={`submit`}
                        title={`Save Changes`} />
                </footer>
            </div>
        </div>
    )
}
