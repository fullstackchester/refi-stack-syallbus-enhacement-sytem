import { limitToFirst, onValue, query, ref } from 'firebase/database'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostStatus from '../../components/PostStatus'
import { database } from '../../js/Firebase'
import SchoolYear from './SchoolYear'
import { faFilter, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PopFilter from '../../components/PopFilter'




function Dashboard() {
    const [posts, setPosts] = useState([])
    const [filterPosts, setFilterPost] = useState('')
    const [selected, setSelected] = useState([])
    const [limitCount, setCount] = useState(5)
    const [sortMethod, setMethod] = useState()
    const [filterModal, setFilterModal] = useState(false)
    const [selectAll, setSelectAll] = useState(false)

    const nav = useNavigate()

    useEffect(() => {
        const reference = query(ref(database, `posts`), limitToFirst(limitCount))
        onValue(reference, postSnap => {
            if (postSnap.exists()) {
                setPosts(Object.values(postSnap.val()))
            }
        })
    }, [limitCount])

    function print() {
        console.log(selected)
    }

    return (
        <div className='w-full h-auto min-h-[85vh] flex flex-col'>
            <PopFilter isOpen={filterModal} handleClose={() => setFilterModal(false)} buttonTitle='Ok' dialogTitle='Select filter' >
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
                                <label key={key} htmlFor={val.id} className='text-sm flex flex-row items-center p-2'>
                                    <input name='filterBy' id={val.id} type='radio' value={val.value}
                                        onChange={() => {
                                            setFilterPost(val.value)
                                            setFilterModal(false)
                                        }} />
                                    <span className='ml-2'>{val.label}</span>
                                </label>)
                    }
                </div>
            </PopFilter>
            
            <div className={`h-auto w-full grid grid-cols-6 gap-4 px-10 py-5`}>
                <div className={`col-span-6 h-auto bg-white table-fixed flex flex-col  border border-zinc-200`}>
                    <div className={`h-14 w-full flex flex-row items-center justify-between border-b border-zinc-100 px-4`}>
                        <h1 className='text-zinc-600 font-medium'>Posts</h1>
                        <div className='flex flex-row'>
                            <input
                                onChange={(e) => setFilterPost(e.target.value)}
                                spellCheck={`false`}
                                type={`search`}
                                className={`text-xs outline-none border border-zinc-200 ring-1 ring-transparent rounded-md
                             focus:border-sky-300 focus:ring-sky-300 text-zinc-700 p-2 w-60`}
                                placeholder={`Search posts...`} />
                            <button
                                onClick={() => setFilterModal(true)}
                                className={`border border-transparent text-zinc-800 ml-2 flex items-center
                                justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}>
                                <FontAwesomeIcon icon={faFilter} size={'xs'} />
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1`}>
                        <table className={`h-auto w-full border-collapse flex-1`}>
                            <thead className={`table-header-group text-sm p-3 `}>
                                <tr className={`text-xs `}>
                                    <th className={`p-2 text-zinc-700 text-left`}>Title</th>
                                    <th className={`p-2 text-zinc-700 text-left hover:bg-zinc-200`}>Date posted</th>
                                    <th className={`p-2 text-zinc-700 text-left`}>Status</th>
                                    <th className={`p-2 text-zinc-700 text-left`}>Select</th>
                                </tr>
                            </thead>
                            <tbody className='h-auto min-h-[15rem]'>
                                {posts
                                    .sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
                                    .filter(entry => Object.values(entry).some(val => typeof val === 'string' && val.toLowerCase().includes(filterPosts.toLowerCase())))
                                    .map((val, key) =>
                                        <tr key={key} className={`text-xs`}>
                                            <td
                                                className={`h-10 font-medium text-zinc-600 border-y border-zinc-100 p-2`}>
                                                <Link to={`/posts/${val.postId}`} className={`hover:underline`}>
                                                    {val.postTitle}
                                                </Link>
                                            </td>
                                            <td
                                                className={`h-10 font-medium text-zinc-600 border-y border-zinc-100 p-2`}>
                                                {val.postDate}
                                            </td>
                                            <td
                                                className={`h-10 border-y border-zinc-100 p-2`}>
                                                <PostStatus postStatus={val.postStatus} textSize={`text-xs`} />
                                            </td>
                                            <td className={`border-y border-zinc-100 p-2`}>
                                                <input type={`checkbox`} value={val.postFile}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelected([
                                                                ...selected, e.target.value
                                                            ])
                                                        } else {
                                                            setSelected((prev) => prev.filter((doc) => doc !== e.target.value))
                                                        }
                                                    }} />
                                            </td>
                                        </tr>)}
                            </tbody>
                        </table>
                        <div className='h-8 flex items-center justify-center '>
                            <button onClick={() => setCount((prev) => prev + 5)}
                                className='text-xs hover:underline text-zinc-600'>Load more...</button>
                        </div>
                    </div>
                    <div className={`h-12 flex flex-row items-center justify-end px-5`}>
                        {selected.length > 0 ?
                            <button
                                onClick={() => print()}
                                className={`text-xs text-white p-2 border border-transparent bg-sky-600 hover:bg-sky-700 h-fit w-fit rounded-md mr-2`}>
                                <FontAwesomeIcon icon={faPrint} />
                            </button> :
                            <></>}
                        <button
                            onClick={() => nav(`/posts`)}
                            type={`button`}
                            className={`text-xs text-white p-2 border border-transparent
                            bg-zinc-600 hover:bg-zinc-700 h-fit w-fit rounded-md transition-colors`}>View all</button>

                    </div>
                </div>
                <div
                    className={`col-span-6 h-auto bg-white flex-col border border-zinc-200`}>
                    <SchoolYear />
                </div>
            </div>

        </div>

    )
}

export default Dashboard