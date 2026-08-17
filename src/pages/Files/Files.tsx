import { DataSnapshot, onValue, ref, type DatabaseReference, type ListenOptions, type Unsubscribe } from 'firebase/database'
import { useState, useEffect, type ChangeEvent, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import PostStatus from 'components/PostStatus'
import { database, storage } from 'clients/Firebase'
import { useFirebase } from 'context/FirebaseContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faDownload, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import Loading from 'components/Loading'
import { schoolYear } from '../../js/Data'
import { snapshotCollection } from 'utils/FirebaseData'
import type { Post } from 'types/domain'

export default function Files() {

    const [files, setFiles] = useState<Post[]>([])
    const { currentUser } = useFirebase()
    const [search, setSearch] = useState('')
    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState<string[]>([])

    const [isFetching, setFetching] = useState(true)
    const [isError, setError] = useState<Error | null>(null);


    const uid = currentUser?.uid ?? ''
    const nav = useNavigate()
    const POST_ENDPOINT = 'forced_error_path';
    const databaseRef: DatabaseReference = ref(database, POST_ENDPOINT);

    const cancelCallback = (error: Error) => {
        if (error) {
            setError(error)
        }
    }

    const callBack = (snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
            setFiles(snapshotCollection<Post>(snapshot))
        }
    }

    const options: ListenOptions = { onlyOnce: true }

    const fetchSyllabusPost = () => {
        setFetching(true)
        onValue(databaseRef, callBack, cancelCallback, options)
        setFetching(false)
    }

    useEffect(() => {
        return fetchSyllabusPost();
    }, [])

    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(myFiles.flatMap((item) => item.postFileUrl ? [item.postFileUrl] : []))
        if (isCheckAll) {
            setCheck([])
        }
    }

    function handleCheck(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.currentTarget
        setCheck([...isCheck, value])
        if (!checked) {
            setCheck(isCheck.filter(item => item !== value))
        }
    }

    const myFiles = files.filter((file) => file.uid === uid)

    function downloadFiles(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        isCheck.forEach(fileUrl => {
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

    if (isError) {
        return (
            <h1>
                Error: {isError.message}
            </h1>
        )
    }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center'>
            <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
                <header className='h-14 flex flex-row justify-between px-5 items-center'>
                    <span className='font-semibold text-zinc-700 text-lg'>Files</span>
                    <div className='w-max h-full flex flex-row items-center justify-center'>
                        <div className='h-full flex flex-row items-center justify-center'>
                            <input
                                type='search'
                                spellCheck={false}
                                placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)}
                                className='w-60 border border-zinc-200 text-xs p-2 outline-hidden rounded-md' />
                        </div>
                        <button
                            title='New post'
                            className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                            onClick={() => nav('/files/create-post')} >
                            <FontAwesomeIcon icon={faPlusCircle} size='sm' />
                        </button>
                    </div>
                </header>
                {!isFetching ?
                    <main className='flex-1 overflow-y-auto'>
                        {myFiles.length !== 0 ?
                            <table className='w-full h-auto table-auto'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr className='border border-zinc-100'>
                                        {
                                            [
                                                {
                                                    title: <input type='checkbox'
                                                        onChange={handleCheckAll}
                                                        checked={isCheckAll} />
                                                },
                                                { title: 'Post Title' },
                                                { title: 'Academic Year' },
                                                { title: 'Date Posted' },
                                                { title: 'Status' }
                                            ].map((v, k) =>
                                                <th
                                                    key={k}
                                                    className='p-3 text-xs font-medium text-left text-zinc-600'>
                                                    {v.title}
                                                </th>)
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {myFiles.filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                        && val.toLowerCase().includes(search.toLowerCase())))
                                        .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                        .map((v, k) =>
                                            <motion.tr
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }} key={k} className='text-xs font-medium hover:bg-zinc-200 
                                transition-colors border border-zinc-100 text-zinc-700'>
                                                <td className='p-3'>
                                                    <input
                                                        type='checkbox'
                                                        id={v.postId}
                                                        onChange={handleCheck}
                                                        checked={isCheck.includes(v.postFileUrl ?? '')}
                                                        value={v.postFileUrl ?? ''}
                                                    />
                                                </td>
                                                <td className='p-3'>
                                                    <span
                                                        className='hover:underline cursor-pointer'
                                                        onClick={() => nav(`/files/${v.postId}/information`)}>{v.postTitle}</span>
                                                </td>
                                                {(function () {
                                                    let syTitle = ''
                                                    schoolYear.forEach(i => {
                                                        if (i.syId === v.syId) {
                                                            syTitle = i.syTitle
                                                        }
                                                    })
                                                    return <td className='p-3'>{syTitle}</td>
                                                })()}
                                                <td className='p-3'>{v.postDate}</td>
                                                <td className='p-3'>
                                                    <PostStatus postStatus={v.postStatus} textSize='text-xs' />
                                                </td>
                                            </motion.tr>)}
                                </tbody>
                            </table>
                            :
                            <div className='h-full w-full grid place-items-center place-content-center'>
                                <div className='text-zinc-600 flex flex-col justify-center items-center'>
                                    <FontAwesomeIcon icon={faFolderOpen} size='4x' />
                                    <h1 className='text-lg font-semibold text-center'>No Files Found</h1>
                                    <span className='text-sm'>Looks like there are no files added.</span>
                                    <button
                                        onClick={() => nav('/files/create-post')}
                                        className='w-max flex flex-row text-xs text-zinc-600 font-medium py-1 px-2 
                                border border-zinc-200 rounded-md outline-hidden hover:bg-zinc-200
                                 transition-colors'>Add Files</button>
                                </div>
                            </div>
                        }
                    </main>
                    :
                    <Loading />
                }
                <footer className='h-12 border-t border-zinc-100 flex items-center p-3'>
                    {isCheck.length !== 0 &&
                        <button
                            onClick={downloadFiles}
                            type='button'
                            className='p-1 h-auto w-auto border border-transparent rounded-md
                         text-white bg-sky-600 hover:bg-sky-700 flex flex-row items-center justify-evenly' >
                            <span className='text-xs mr-1'>Download</span>
                            <FontAwesomeIcon icon={faDownload} size='xs' />
                        </button>}
                </footer>
            </div>
        </div>
    )
}   
