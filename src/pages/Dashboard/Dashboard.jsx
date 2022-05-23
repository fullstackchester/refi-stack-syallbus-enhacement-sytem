import React, { useRef, useState, useEffect } from 'react'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import PostChart from './PostChart'
import UserChart from './UserChart'
import SubjectChart from './SubjectChart'
import PopNotif from '../../components/PopNotif'
import PopForm from '../../components/PopForm'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'
import { posts } from '../../js/Data'
import Input from '../../components/Inputs/Input'

function Dashboard() {
    const [AY, setAY] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])
    const { role, deleteData } = useFirebase()
    const [notifTitle, setTitle] = useState('')
    const [notifMsg, setMsg] = useState('')
    const [isForm, setForm] = useState()


    const syStartRef = useRef()
    const syEndRef = useRef()

    useEffect(() => {
        onValue(ref(database, 'schoolYear'), snapshot => {
            if (snapshot.exists()) {
                setAY(Object.values(snapshot.val()))
            }
        })
    }, [])

    function addSy(e) {
        e.preventDefault()
        const id = uuidv4()
        const newSy = {
            syId: id,
            syDateCreated: new Date().toLocaleString(),
            syEnd: syEndRef.current.value,
            syStart: syStartRef.current.value,
            syTitle: `SY ${new Date(syStartRef.current.value).getFullYear()}-${new Date(syEndRef.current.value).getFullYear()}`
        }

        set(ref(database, `schoolYear/${id}`), newSy)
            .then(() => {
                setOpen(false)
                setTitle('Add Success')
                setMsg(`Successfully added School Year ${newSy.syTitle}`)
                setSuccess(true)
            }).catch((err) => {
                console.log(err)
            });
    }

    function handleCheckAll() {
        setCheckAll(!isCheckAll)
        setCheck(AY.map(item => item.syId))
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

    function deleteSy(sy) {
        deleteData(`schoolYear/${sy.syId}`)
            .then(() => {
                setTitle('Delete Success')
                setMsg('Successfully deleted School Year')
                setSuccess(true)

            }).catch((err) => {
                console.log(err)
            });
    }

    return (
        <div className='w-full h-[calc(100vh-3rem)] flex flex-col items-center justify-center'>
            <PopForm
                isOpen={isOpen}
                handleClose={() => setOpen(false)}
                buttonTitle={'Add'}
                formTitle='New School Year'
                formId='add-school-year' >
                <div className='h-auto py-5'>
                    <form
                        id='add-school-year'
                        name='add-school-year'
                        onSubmit={addSy}
                        className='w-full h-full flex flex-col'>
                        {
                            [
                                {
                                    id: 'sy-start',
                                    name: 'sy-start',
                                    label: 'School Year Start',
                                    type: 'date',
                                    placeholder: 'Select Date',
                                    ref: syStartRef,
                                    require: true,
                                },
                                {
                                    id: 'sy-end',
                                    name: 'sy-end',
                                    label: 'School Year End',
                                    type: 'date',
                                    placeholder: 'Select Date',
                                    ref: syEndRef,
                                    require: true,
                                },
                            ].map((v, k) =>
                                <Input
                                    key={k}
                                    htmlFor={v.id}
                                    label={v.label}
                                    width={'w-full'} >
                                    <input
                                        name={v.name}
                                        id={v.id}
                                        ref={v.ref}
                                        type={v.type}
                                        required={v.require}
                                        placeholder={v.placeholder}
                                        className='h-12 bg-zinc-100 p-2 text-sm outline-none border border-transparent 
            ring-2 ring-transparent rounded-sm focus:ring-sky-300 transition-all' />
                                </Input>
                            )
                        }
                    </form>
                </div>
            </PopForm>
            <PopNotif
                isOpen={isSuccess}
                handleClose={() => setSuccess(false)}
                dialogTitle={notifTitle}
                dialogMessage={notifMsg} />

            <div className='grid grid-cols-6 gap-2 h-[90vh] w-[85%] grid-rows-2'>
                <PostChart />
                <UserChart />
                <SubjectChart />
                <div className='col-span-6 row-span-1 bg-white rounded-md flex flex-col'>
                    <div className='h-12 flex flex-row items-center justify-between px-3 border-b border-white'>
                        <h1 className=' text-sm font-semibold text-zinc-500'>School year</h1>
                        <button
                            onClick={() => setOpen(true)}
                            className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                            justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}>
                            <FontAwesomeIcon icon={faAdd} size='sm' />
                        </button>
                    </div>
                    <div className='flex-1 overflow-y-auto border border-white'>
                        <table className='w-full h-auto table-auto'>
                            <thead className='sticky top-[-1px] bg-white border border-white shadow-sm'>
                                <tr className='border border-white sticky top-0'>
                                    {
                                        [
                                            {
                                                title: <input
                                                    type='checkbox'
                                                    onChange={handleCheckAll}
                                                    checked={isCheckAll} />
                                            },
                                            { title: 'School Year' },
                                            { title: 'Start Date' },
                                            { title: 'End Date' },
                                            { title: 'Files' },
                                            { title: role === 'administrator' ? 'Actions' : '' }
                                        ].map((v, k) =>
                                            <th key={k}
                                                className='text-xs text-zinc-600 py-2 px-3 text-left'>
                                                {v.title}
                                            </th>)
                                    }
                                </tr>
                            </thead>
                            <tbody className='h-[calc(100%-3rem)]'>
                                {AY.map((v, k) =>
                                    <tr
                                        key={k}
                                        className='hover:bg-zinc-200 transition-colors' >
                                        <td className='text-xs text-zinc-600 p-3'>
                                            <input
                                                type='checkbox'
                                                onChange={handleCheck}
                                                checked={isCheck.includes(v.syId)}
                                                value={v.syId} />
                                        </td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syTitle}</td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syStart}</td>
                                        <td className='text-xs text-zinc-600 p-3'>{v.syEnd}</td>
                                        {(function () {
                                            let fileCount = 0
                                            posts.forEach(p => {
                                                if (p.syId === v.syId) {
                                                    fileCount += 1
                                                }
                                            })
                                            return <td className='py-3 px-2 text-xs '>{fileCount}</td>
                                        })()}
                                        {role === 'administrator' &&
                                            <td className='h-full'>
                                                <button
                                                    onClick={() => deleteSy(v)}
                                                    className='p-1 h-7 w-7 text-white bg-red-600 rounded-md outline-none'>
                                                    <FontAwesomeIcon icon={faTrash} size='xs' />
                                                </button>
                                            </td>}
                                    </tr>)
                                }
                            </tbody>

                        </table>
                    </div>
                    <div className='h-10 border-t border-zinc-100'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

