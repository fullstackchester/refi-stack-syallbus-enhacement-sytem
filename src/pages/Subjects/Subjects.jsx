import React, { useState, useEffect } from 'react'
import { ref, onValue, update, remove } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faDeleteLeft, faFolderOpen, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { useFirebase } from '../../js/FirebaseContext'
import Confirm from '../../components/PopConfirmation'
import PopNotif from '../../components/PopNotif'
import Loading from '../../components/Loading'

function Subjects() {

    const nav = useNavigate()
    const [search, setSearch] = useState('')
    const [subject, setSubject] = useState([])
    const [sort, setSort] = useState('courseCode')
    const { role } = useFirebase()

    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])

    const [openConfirm, setOpen] = useState(false)
    const [actionDone, setActionDone] = useState(false)

    const [isFetching, setFetching] = useState(true)

    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(subject.map(item => item.subjectId))
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


    useEffect(() => {
        setTimeout(function () {
            onValue(ref(database, 'subject'), snapshot => {
                if (snapshot.exists()) {
                    setSubject(Object.values(snapshot.val()))
                    setFetching(false)
                }
            })
        }, 500)
    }, [])



    function deleteSelected(e) {
        e.preventDefault()
        setOpen(false)
        isCheck.forEach(i => {
            remove(ref(database, `subject/${i}`))
                .then(() => {
                    setActionDone(true)
                }).catch((err) => {
                    console.log(err)
                });
        })
    }


    return <div className='w-full h-[calc(100vh-3rem)] flex items-center justify-center py-5'>
        <Confirm
            isOpen={openConfirm}
            handleClose={() => setOpen(false)}
            dialogTitle='Confirm Delete'
            dialogMessage='Are you sure you want to delete these subject(s)?'
            dedicatedFunction={deleteSelected}
            buttonTitle='Delete' />

        <PopNotif
            isOpen={actionDone}
            handleClose={() => setActionDone(false)}
            dialogTitle='Delete Success'
            dialogMessage='Successfully delete subjects.' />

        <div className='h-[90vh] w-[85%] bg-white rounded-md flex flex-col'>
            <header className='h-14 flex flex-row justify-end px-5 items-center'>
                <div>
                    <input
                        type='text'
                        spellCheck={false}
                        placeholder='Search'
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-60 border border-zinc-200 text-xs p-2 outline-none rounded-md' />
                </div>
                {
                    role !== 'faculty' && [
                        {
                            icon: faPlusCircle,
                            title: 'New subject',
                            onClick: () => nav('/subjects/add')
                        },
                    ].map((v, k) =>
                        <button
                            key={k}
                            title={v.title}
                            className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                            justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}
                            onClick={v.onClick} >
                            <FontAwesomeIcon icon={v.icon} size='sm' />
                        </button>
                    )
                }
            </header>
            {!isFetching ?
                <main className='flex-1 overflow-y-auto'>
                    {
                        subject.length !== 0 ?
                            <table className='w-full h-auto table-auto'>
                                <thead className='sticky top-0 bg-white'>
                                    <tr className='border border-zinc-100'>
                                        {
                                            [
                                                {
                                                    title: <input
                                                        type='checkbox'
                                                        onChange={handleCheckAll}
                                                        checked={isCheckAll} />
                                                },
                                                { title: 'Course Code', sortBy: () => setSort('couseCode') },
                                                { title: 'Course Title', sortBy: () => setSort('subjectTitle') },
                                                { title: 'Units', sortBy: () => setSort('creditUnits') },
                                            ].map((val, key) =>
                                                <th key={key}
                                                    onClick={val.sortBy}
                                                    className='p-3 text-xs text-left text-zinc-600 hover:bg-zinc-200
                                             transition-colors cursor-pointer'>
                                                    {val.title}
                                                </th>)
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subject.length !== 0 ?
                                            subject
                                                .sort((a, b) => {
                                                    if (sort === 'courseCode') {
                                                        return a.courseCode.toLowerCase().localeCompare(b.courseCode.toLowerCase())
                                                    } else if (sort === 'subjectTitle') {
                                                        return a.subjectTitle.toLowerCase().localeCompare(b.subjectTitle.toLowerCase())
                                                    } else if (sort === 'creditUnits') {
                                                        return a.creditUnits.toLowerCase().localeCompare(b.creditUnits.toLowerCase())
                                                    } else {

                                                    }
                                                })
                                                .filter(entry => Object.values(entry).some(val => typeof val === 'string'
                                                    && val.toLowerCase().includes(search.toLowerCase())))
                                                .map((v, k) =>
                                                    <motion.tr
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        key={k}
                                                        className='border border-zinc-100 text-xs text-zinc-700 font-medium 
                                            hover:bg-zinc-200 transition-colors'>
                                                        <td className='p-3'>
                                                            {/* Place the Checkbox here */}
                                                            <input
                                                                type='checkbox'
                                                                onChange={handleCheck}
                                                                checked={isCheck.includes(v.subjectId)}
                                                                value={v.subjectId} />
                                                        </td>
                                                        <td className='p-3 cursor-pointer hover:underline'
                                                            onClick={() => nav(`/subjects/${v.subjectId}/information`)}> {v.courseCode} </td>
                                                        <td className='p-3'> {v.subjectTitle} </td>
                                                        <td className='p-3'> {v.creditUnits} </td>
                                                    </motion.tr>) : <></>
                                    }
                                </tbody>
                            </table>
                            :
                            <div className='h-full w-full grid place-items-center place-content-center'>
                                <div className='text-zinc-600 flex flex-col justify-center items-center'>
                                    <FontAwesomeIcon icon={faFolderOpen} size='4x' />
                                    <h1 className='text-lg font-semibold text-center'>No Subject Found</h1>
                                    <span className='text-sm'>It seems that there is no subject at the moment</span>
                                    <button
                                        onClick={() => nav('/subjects/add')}
                                        className='w-max flex flex-row text-xs text-zinc-600 font-medium py-1 px-2 
                            border border-zinc-200 rounded-md outline-none hover:bg-zinc-200
                             transition-colors'>Add Subject</button>
                                </div>
                            </div>
                    }
                </main>
                :
                <Loading />
            }
            <footer className='h-12 border-t border-zinc-100 flex items-center p-3'>
                {
                    isCheck.length !== 0 &&
                    <button
                        onClick={() => setOpen(true)}
                        type='button'
                        className='p-1 h-auto w-auto border border-transparent rounded-md
                     text-white bg-red-600 hover:bg-red-700 flex flex-row items-center justify-evenly' >
                        <span className='text-xs mr-1'>Delete</span>
                        <FontAwesomeIcon icon={faDeleteLeft} size='xs' />
                    </button>
                }
            </footer>
        </div>
    </div>
}

export default Subjects