import React, { useState, useEffect } from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import AddPanel from '../../components/Panel'
import { useFirebase } from '../../js/FirebaseContext'
import { ref, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faAdd } from '@fortawesome/free-solid-svg-icons'

function Subjects() {


    const [visible, setVisible] = useState(false)
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const { writeData } = useFirebase()
    const newSubject = {
        subjectId: uuidv4(),
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit,
        subjectDescription: ''
    }
    const [subject, setSubject] = useState([])

    useEffect(() => {

        const getSubjects = onValue(ref(database, 'subject'), snapshot => {
            setSubject(Object.values(snapshot.val()))
        })

        return getSubjects
    }, [])

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

        // intial method, stupidly getting the child count and set it as the key
        // but changed it into uuidv4 uniqueness and prevents
        // unneccessary errors that may occurs when using the 
        // stupid method of incremental key

        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                alert('Subject added successFully')
                setVisible(false)

            }).catch((err) => {
                alert(err.message)
            });
    }


    return (
        <div className='h-auto border border-zinc-100 rounded-lg shadow-md'>
            <nav className='h-14  border-b border-slate-200 flex flex-row justify-between py-2 px-4'>
                <span className='text-xl flex items-center font-medium text-zinc-600'>Subjects</span>

                <ul className='text-zinc-700 flex flex-row items-center p-2'>
                    <li className='text-xl cursor-pointer'>
                        <FontAwesomeIcon icon={faAdd}
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
                {subject && subject.map((val, key) => {
                    return (
                        <div key={key} className='col-span-1 h-36 border border-zinc-100 bg-zinc-50 p-4 flex flex-col'>

                            <span className='text-xl text-zinc-600 font-semibold hover:text-sky-700'>
                                <FontAwesomeIcon icon={faBook} className='mr-3' />
                                <Link to={`/subjects/${val.subjectId}`}>
                                    {val.courseCode}
                                </Link>
                            </span>

                            <span className='text-sm text-zinc-600 overflow-hidden'>
                                {val.subjectTitle}</span>
                        </div>
                    )
                })}
                {subject.length === 0 ? <div className='col-span-4 h-[400px] flex justify-center items-center'>No subjects at the list</div> : ''}
            </main>
            <footer className='h-14 border-t border-zinc-200'></footer>
        </div>
    )
}

export default Subjects