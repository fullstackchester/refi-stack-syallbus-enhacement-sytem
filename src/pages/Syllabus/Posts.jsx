import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import Navbar from '../../components/Navbar'
import PostStatus from '../../components/PostStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'




export default function Posts() {

    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [schoolyear, setSy] = useState([])
    const [searchpost, setSearch] = useState('')
    const [isExpand, setExpand] = useState(false)

    useEffect(() => {
        onValue(ref(database, 'posts'), posts => {
            if (posts.exists() && posts.length !== 0) {
                setPosts(Object.values(posts.val()))
            }
        })

        onValue(ref(database, 'schoolYear'), sy => {
            if (sy.exists()) {
                setSy(Object.values(sy.val()))
            }
        })
    }, [])

    return (
        <div className='w-full h-auto min-h-[600px]'>
            <Navbar
                title={`New Post`}
                headerTitle={`Posted Syllabus`}
                searchBarOnChange={(e) => setSearch(e.target.value)}
                buttonOnClick={(e) => {
                    e.preventDefault()
                    nav('/posts/create-post')
                }}
            />
            <main className='w-full h-auto text-lg flex flex-col box-border'>
                {schoolyear.map((val, key) => {
                    return (
                        <div key={key} className={`${isExpand ? 'h-auto' : 'h-[400px]'} min-h-[15rem] border border-zinc-200 box-border bg-white
                         mt-5 mx-10 rounded-md p-5 flex flex-col`}>
                            <div className='w-fit h-fit text-sm text-zinc-600 font-medium'>{val.syTitle}</div>
                            <div className='flex-1 border border-zinc-200'>

                            </div>
                            <div className='h-8 p-2 flex items-center justify-end'>
                                <button onClick={() => isExpand ? setExpand(false) : setExpand(true)}
                                    className='text-xs text-zinc-600 font-medium flex flex-row items-center hover:underline'>
                                    Expand <FontAwesomeIcon icon={faArrowDown} className='ml-1' />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

// {posts && posts
//     .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
//     .filter(entry => Object.values(entry).some(val => typeof val === 'string'
//         && val.toLowerCase().includes(searchpost.toLowerCase())))
//     .map((val, key) => {
//         return (
//             <div
//                 key={key}
//                 className='col-span-1 h-auto min-h-[250px] bg-white border border-gray-200 rounded-lg
//                 flex flex-col'>
//                 <div className='h-auto py-3 px-5 flex-1'>
//                     <Link to={`/posts/${val.postId}`} className='text-lg text-zinc-700 font-semibold
//                      block hover:underline overflow-hidden text-ellipsis'>
//                         {val.postTitle}
//                     </Link>
//                     <span className='text-xs font-medium text-zinc-500 block'>{`Posted: ${val.postDate}`}</span>
//                 </div>
//                 <div className='h-12 flex justify-end items-center px-3'>
//                     <PostStatus textSize={`text-xs`} postStatus={val.postStatus} />
//                 </div>
//             </div>
//         )
//     })}
