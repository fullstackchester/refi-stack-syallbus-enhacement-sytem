import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database, storage } from '../../js/Firebase'
import PostStatus from '../../components/PostStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faPlusCircle, faFilter, faCalendarAlt, faDeleteLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import PopFilter from '../../components/PopFilter'
import print from 'print-js'
import printJS from 'print-js'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { motion } from 'framer-motion'
import Confirm from '../../components/PopConfirmation'
import Loading from '../../components/Loading'
import { schoolYear } from '../../js/Data'
import { render } from '@testing-library/react'



export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [ay, setAy] = useState([])
    const [searchpost, setSearch] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [filterSy, setFilterSy] = useState(false)

    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])

    const [isFetching, setFetching] = useState(true)



    useEffect(() => {
        setTimeout(function () {
            onValue(ref(database, 'posts'), posts => {
                if (posts.exists() && posts.length !== 0) {
                    setPosts(Object.values(posts.val()))

                }
            })

            onValue(ref(database, 'schoolYear'), sy => {
                if (sy.exists()) {
                    setAy(Object.values(sy.val()))
                }
            })

            setFetching(false)
        }, 500)
    }, [])


    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(posts.map(item => item.postFileUrl))
        if (isCheckAll) {
            setCheck([])
        }
    }

    function handleCheck(e) {
        const { checked, value } = e.target
        setCheck([...isCheck, value])
        if (!checked) {
            setCheck(isCheck.filter(item => item !== value))
        }
    }

    const print = () => {
        isCheck.map(fileUrl => {
            getDownloadURL(storageRef(storage, fileUrl))
                .then((url) => {
                    // console.log(`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`)
                    window.open(url)
                })
                .catch((e) => {
                    console.log(e)
                });
        })
    }


    return (
        <div className='w-full h-auto min-h-[calc(100vh-3rem)] flex flex-col items-center justify-center'>
            <PopFilter isOpen={isOpen} handleClose={() => setOpen(false)} buttonTitle='Ok' dialogTitle='Filter by' >
                <div className='flex flex-col'>
                    {
                        [
                            {
                                id: 'Needs Reviewing',
                                label: 'Needs Reviewing',
                                value: 'Needs Reviewing',
                                select: '',
                            },
                            {
                                id: 'Needs Revisions',
                                label: 'Needs Revisions',
                                value: 'Needs Revisions'
                            },
                            {
                                id: 'Approved',
                                label: 'Approved',
                                value: 'Approved'
                            },
                            {
                                id: 'null',
                                label: 'None',
                                value: ''
                            },
                        ]
                            .map((val, key) =>
                                <label key={key} htmlFor={val.id} className='text-sm flex flex-row items-center p-2 hover:bg-zinc-200'>
                                    <input name='filterBy' id={val.id} type='radio' value={val.value}
                                        onChange={() => {
                                            setSearch(val.value)
                                            setOpen(false)
                                        }} />
                                    <span className='ml-2'>{val.label}</span>
                                </label>)
                    }
                </div>
            </PopFilter>
            <PopFilter isOpen={filterSy} handleClose={() => setFilterSy(false)} buttonTitle='Ok' dialogTitle='Select School Year' >
                <div className='flex flex-col'>
                    {
                        ay.map((val, key) =>
                            <label key={key} htmlFor={val.syId} className='text-sm flex flex-row items-center p-2 hover:bg-zinc-200'>
                                <input name='filterBy' id={val.syId} type='radio' value={val.syId}
                                    onChange={() => {
                                        setSearch(val.syId)
                                        setFilterSy(false)
                                    }} />
                                <span className='ml-2'>{val.syTitle}</span>
                            </label>)
                    }
                </div>
            </PopFilter>

            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-between px-5 items-center'>
                    <span className='font-semibold text-zinc-700 text-lg'>Syllabus</span>
                    <div className='w-max h-full flex flex-row items-center justify-center'>
                        <input
                            type='text'
                            spellCheck={false}
                            placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-60 border border-zinc-200 text-xs p-2 outline-none rounded-md' />
                        {
                            [
                                {
                                    icon: faPlusCircle,
                                    title: 'New post',
                                    onClick: () => nav('create-post')
                                },
                                {
                                    icon: faFilter,
                                    title: 'Sort By',
                                    onClick: () => setOpen(true)
                                },
                                {
                                    icon: faCalendarAlt,
                                    title: 'Sort by School Year',
                                    onClick: () => setFilterSy(true)
                                },
                            ].map((val, key) =>
                                <button
                                    key={key}
                                    title={val.title}
                                    className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                                    onClick={val.onClick} >
                                    <FontAwesomeIcon icon={val.icon} size='sm' />
                                </button>)
                        }
                    </div>
                </header>

                {
                    !isFetching ?
                        <main className='flex-1 overflow-y-auto'>
                            {
                                posts.length !== 0 ?
                                    <table className='w-full h-auto table-auto'>
                                        <thead className='sticky top-0 bg-white'>
                                            <tr className='border border-zinc-100'>
                                                {[
                                                    {
                                                        title: <input
                                                            type='checkbox'
                                                            onChange={handleCheckAll}
                                                            checked={isCheckAll} />
                                                    },
                                                    { title: 'Post Title' },
                                                    { title: 'Academic Year' },
                                                    { title: 'Date Posted' },
                                                    { title: 'Status' }
                                                ].map((val, key) =>
                                                    <th key={key} className='p-2 text-xs text-left text-zinc-600'>{val.title}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts && posts
                                                .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                                    && val.toLowerCase().includes(searchpost.toLowerCase())))
                                                .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                                .map((v, k) =>
                                                    <motion.tr
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        key={k}
                                                        className='text-xs font-medium hover:bg-zinc-200
                                         transition-colors border border-zinc-100 text-zinc-700' >
                                                        <td className='py-3 px-2 text-xs '>
                                                            <input
                                                                type='checkbox'
                                                                id={v.postId}
                                                                onChange={handleCheck}
                                                                checked={isCheck.includes(v.postFileUrl)}
                                                                value={v.postFileUrl} />
                                                        </td>
                                                        <td className='py-3 px-2 text-xs  hover:underline cursor-pointer'
                                                            onClick={() => {
                                                                nav(`/posts/${v.postId}`)
                                                            }}>{v.postTitle}</td>

                                                        {(function () {
                                                            let syTitle = ''
                                                            schoolYear.forEach(i => {
                                                                if (i.syId === v.syId) {
                                                                    syTitle = i.syTitle
                                                                }
                                                            })
                                                            return <td className='py-3 px-2 text-xs '>{syTitle}</td>
                                                        })()}

                                                        <td className='py-3 px-2 text-xs '>{v.postDate}</td>
                                                        <td className='py-3 px-2 text-xs '>
                                                            <PostStatus postStatus={v.postStatus} textSize={'text-xs'} />
                                                        </td>
                                                    </motion.tr>)}
                                        </tbody>
                                    </table>
                                    :
                                    <div className='h-full w-full grid place-items-center place-content-center'>
                                        <div className='text-zinc-600 flex flex-col justify-center items-center'>
                                            <FontAwesomeIcon icon={faFolderOpen} size='4x' />
                                            <h1 className='text-lg font-semibold text-center'>No Posted Syllabus</h1>
                                            <span className='text-sm'>It seems that there is no posted syllabus at the moment</span>
                                            <button
                                                onClick={() => nav('/posts/create-post')}
                                                className='w-max flex flex-row text-xs text-zinc-600 font-medium py-1 px-2 
                                border border-zinc-200 rounded-md outline-none hover:bg-zinc-200
                                 transition-colors'>Add Post</button>
                                        </div>
                                    </div>
                            }
                        </main>
                        :
                        <Loading />
                }

                <footer className='h-12 border-t border-zinc-100 flex items-center p-3'>
                    {isCheck.length !== 0 &&
                        <>
                            <button
                                onClick={print}
                                type='button'
                                className='p-1 h-auto w-auto border border-transparent rounded-md
                         text-white bg-sky-600 hover:bg-sky-700 flex flex-row items-center justify-evenly' >
                                <span className='text-xs mr-1'>Download</span>
                                <FontAwesomeIcon icon={faDownload} size='xs' />
                            </button>
                        </>
                    }
                </footer>
            </div>
        </div>
    )
}
