import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import PopForm from '../../components/PopForm'
import { v4 as uuidv4 } from 'uuid'
import { onValue, ref, set } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext'


export default function SchoolYear() {
    const [visible, setVisible] = useState(false)
    const startYearRef = useRef()
    const endYearRef = useRef()
    const [sy, setSy] = useState([])

    const nav = useNavigate()

    useEffect(() => {
        onValue(ref(database, `schoolYear`), snapshot => {
            if (snapshot.exists()) {
                setSy(Object.values(snapshot.val()))
            }
        })
    }, [])

    const addForm =
        <form
            id='add-school-year-form'
            onSubmit={(e) => {
                e.preventDefault()
                const newSchoolYear = {
                    syId: uuidv4(),
                    syTitle: `SY ${new Date(startYearRef.current.value).getFullYear()}-${new Date(endYearRef.current.value).getFullYear()}`,
                    syStart: startYearRef.current.value,
                    syEnd: endYearRef.current.value,
                    syDateCreated: new Date().toLocaleString(),
                    syStatus: 'open'
                }

                set(ref(database, `schoolYear/${newSchoolYear.syId}`), newSchoolYear)
                    .then(() => {
                        setVisible(false)
                    })
                    .catch((e) => {
                        alert(e.message)
                    })

            }}
            className='w-full h-auto border border-transparent py-5'>

            <div className='flex flex-row h-auto w-full'>
                <label htmlFor='start-year' className='flex flex-col text-xs w-1/2 m-2'>
                    <span className='font-medium text-zinc-600'>Start Year</span>
                    <input
                        required={true}
                        ref={startYearRef}
                        form='add-school-year-form'
                        id='start-year' type='date'
                        className=' outline-1 ring-1 ring-transparent p-2 border border-zinc-200 
                    focus:outline-none focus:border-sky-300 focus:ring-sky-300 rounded-sm' />
                </label>

                <label htmlFor='end-year' className='flex flex-col text-xs w-1/2 m-2'>
                    <span className='font-medium text-zinc-600'>End Year</span>
                    <input
                        required={true}
                        ref={endYearRef}
                        form='add-school-year-form'
                        id='end-year' type='date'
                        className=' outline-1 ring-1 ring-transparent p-2 border border-zinc-200 
                    focus:outline-none focus:border-sky-300 focus:ring-sky-300 rounded-sm' />
                </label>
            </div>
        </form>
    return (
        <>
            <div className='w-full h-14 flex flex-row items-center justify-between px-5'>
                <h1 className='text-zinc-600 font-medium'>School Year</h1>
                <button
                    onClick={() => visible ? setVisible(false) : setVisible(true)}
                    className='p-1 h-8 w-8  hover:bg-zinc-600 hover:text-white 
                    transition-colors hover:shadow-md hover:hover-zinc-300 rounded-md' title='Add School Year'>
                    <FontAwesomeIcon icon={faAdd} size={`xs`} />
                </button>
            </div>
            <PopForm
                formTitle={`New School Year`}
                formId={`add-school-year-form`}
                isOpen={visible}
                children={addForm}
                buttonTitle={`Add`}
                handleClose={() => setVisible(false)}
            />
            <table className=' w-full'>
                <thead>
                    <tr className='bg-zinc-50'>
                        <th className='dash-th'>S.Y Date</th>
                        <th className='dash-th'>Available Syllabus</th>
                        <th className='dash-th'>Status</th>
                    </tr>
                </thead>
                <tbody className='h-auto min-h-[20rem] border border-transparent'>
                    {sy.map((val, key) => {
                        return (
                            <tr key={key} className={`text-xs font-medium text-zinc-700`}>
                                <td className='border border-zinc-200 p-2'>{val.syTitle}</td>
                                <td className='border border-zinc-200 p-2'>{val.syTitle}</td>
                                <td className='border border-zinc-200 p-2'>{val.syStatus}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='h-14 w-full flex flex-row justify-end items-center px-5'>
                <button
                    onClick={() => nav(`/school-year`)}
                    className={`border border-transparent bg-zinc-600 hover:bg-zinc-700 text-white text-xs
                p-2 rounded-md shadow-md shadow-zinc-300`}>View all</button>
            </div>
        </>
    )
}
