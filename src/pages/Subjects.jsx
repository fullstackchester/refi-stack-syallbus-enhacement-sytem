import React, { useState, useEffect } from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import AddPanel from '../components/Panel'
import { useFirebase } from '../js/FirebaseContext'
import { ref, onValue, child, off } from 'firebase/database'
import { database } from '../js/Firebase'
import { ItemSubject } from '../components/Item'

function Subjects() {


    const [visible, setVisible] = useState(false)
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const { writeData } = useFirebase()
    const subject = {
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit
    }
    const [fetchSub, setFetchSub] = useState([])

    const [size, setSIze] = useState()

    useEffect(() => {

        const getSubjects = onValue(ref(database, 'subject'), snapshot => {
            setFetchSub(snapshot.val())
        })

        onValue(ref(database, 'subject'), snapshot => {
            return setSIze(snapshot.val().length)
        })
        return getSubjects
    }, [])

    console.log(fetchSub)

    const AddSubjectData = [
        {
            name: 'course-code',
            label: 'Cource code',
            type: 'text',
            placeholder: 'IT 101',
            onChange: (e) => setCourseCode(e.target.value),
            required: true,
        },
        {
            name: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: (e) => setSubjectTitle(e.target.value),
            required: true,
        },
        {
            name: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            onChange: (e) => setCreditUnit(e.target.value),
            required: true,
        },


    ]

    function close(e) {
        e.preventDefault()
        setVisible(visible ? false : true)
    }




    function AddSub(e) {
        e.preventDefault()
        writeData('subject/', subject, size)
            .then(() => {
                alert('Subject added successFully')
                setVisible(false)

            }).catch((err) => {
                alert(err.message)
            });
    }


    return (
        <div className='h-auto border border-zinc-300 rounded-lg'>
            <nav className='h-14 border-b border-slate-200 flex flex-row justify-between py-2 px-4'>
                <span className='text-xl flex items-center font-medium text-zinc-600'>Subjects</span>

                <ul className='text-zinc-700 flex flex-row items-center p-2'>
                    <li className='text-xl cursor-pointer'>
                        <IoAddCircleSharp
                            onClick={() => {
                                setVisible(true)
                            }} />
                    </li>
                </ul>
            </nav>
            {visible && <AddPanel
                handleClose={close}
                onSubmit={AddSub}
                submitTitle='Add subject'
                title='New Subject'
                inputFields={AddSubjectData} />}

            <main className='h-auto grid grid-cols-4 gap-2 p-4'>
                {fetchSub && fetchSub.map((val, key) => {
                    return (
                        <div key={key} className='col-span-1 h-36 border p-1 flex flex-col'>
                            <span>{val.courseCode}</span>
                            <span>
                                {val.subjectTitle}</span>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default Subjects