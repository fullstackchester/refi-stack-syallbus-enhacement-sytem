import React, { useRef, useState, useEffect } from 'react'
import { orderByValue, equalTo, onValue, query, ref, set, limitToFirst } from 'firebase/database'
import { Link, Route, useNavigate } from 'react-router-dom'
import { database } from '../../js/Firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import PostChart from './PostChart'
import UserChart from './UserChart'
import SubjectChart from './SubjectChart'
import PopNotif from '../../components/PopNotif'
import PopForm from '../../components/PopForm'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'

function Dashboard() {
    const [AY, setAY] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isCheckAll, setCheckAll] = useState(false)
    const [isCheck, setCheck] = useState([])
    const { role } = useFirebase()


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
            syStatus: 'open',
            syTitle: `SY ${new Date(syStartRef.current.value).getFullYear()}-${new Date(syEndRef.current.value).getFullYear()}`
        }

        set(ref(database, `schoolYear/${id}`), newSy)
            .then(() => {
                setOpen(false)
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
                                <label
                                    key={k}
                                    htmlFor={v.id}
                                    className='flex flex-col mb-5 w-full'>
                                    <span className='text-sm text-zinc-600 font-medium'>{v.label}</span>
                                    <input
                                        name={v.name}
                                        id={v.id}
                                        ref={v.ref}
                                        type={v.type}
                                        required={v.require}
                                        placeholder={v.placeholder}
                                        className='border border-zinc-200 p-2 outline-none focus:border-sky-300 rounded-sm w-full 
                                        ring-1 ring-transparent focus:ring-sky-300 transition-colors text-zinc-700 text-sm' />

                                </label>)
                        }

                    </form>
                </div>
            </PopForm>
            <PopNotif
                isOpen={isSuccess}
                handleClose={() => setSuccess(false)}
                dialogTitle={'Success'}
                dialogMessage='Successfully added new School Year' />

            <div className='grid grid-cols-6 gap-2 h-[90vh] w-[85%] grid-rows-2'>
                <PostChart />
                <UserChart />
                <SubjectChart />
                <div className='col-span-6 row-span-1 bg-white rounded-md flex flex-col'>
                    <div className='h-12 flex flex-row items-center justify-between px-3'>
                        <h1 className=' text-sm font-semibold text-zinc-500'>School year</h1>
                        <button
                            onClick={() => setOpen(true)}
                            className={`border border-transparent text-zinc-800 ml-2 flex items-center 
                            justify-center hover:bg-zinc-100 w-8 h-8 rounded-full`}>
                            <FontAwesomeIcon icon={faAdd} size='sm' />
                        </button>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
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
                                            { title: 'School Year' },
                                            { title: 'Start Date' },
                                            { title: 'End Date' },
                                            { title: 'Status' }
                                        ].map((v, k) =>
                                            <th key={k}
                                                className='text-xs text-zinc-600 py-2 px-3 text-left'>
                                                {v.title}
                                            </th>)
                                    }
                                </tr>
                            </thead>
                            <tbody className='h-[calc(100%-3rem)]'>
                                {
                                    AY && AY.map((v, k) =>
                                        <tr key={k} className='hover:bg-zinc-200 transition-colors'>
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
                                            <td className='text-xs text-zinc-600 p-3'>{v.syStatus}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>

                    </div>
                    <div className='h-10'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard