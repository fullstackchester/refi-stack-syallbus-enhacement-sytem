import React, { useState, useEffect } from 'react'
import { useFirebase } from '../../js/FirebaseContext'
import { ref, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faAdd, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Node from '../../components/Node'
import '../../assets/Images/svg/material_search.svg';

function Subjects() {


    const [visible, setVisible] = useState(false)
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()

    const nav = useNavigate()


    const { writeData } = useFirebase()
    const newSubject = {
        subjectId: uuidv4(),
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit,
        subjectDescription: courseDescription
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
            label: 'Course code',
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

        {
            name: 'course-description',
            label: 'Course description',
            type: 'text',
            placeholder: 'Enter your text here...',
            onChange: (e) => setCourseDescription(e.target.value),
            required: true,
        },


    ]


    return (
        <div className='h-auto'>
            <nav className='h-14  flex flex-row justify-between px-10 border bg-white'>
                <span className='text-xl flex items-center font-medium text-zinc-600 '>Subjects</span>
                <div className='h-full w-auto min-w-[20rem] border-red-600 flex flex-row py-2'>
                    <div className="flex justify-center flex-1 bg-transparent border border-zinc-200 rounded-md mr-2">
                        <input
                            spellCheck={false}
                            placeholder={`Search`}
                            aria-placeholder={`Search`}
                            type={`text`} className={`outline-none border border-transparent bg-transparent flex-1 px-3
                            ring-1 ring-transparent focus:border-sky-300 focus:ring-sky-200 text-sm rounded-tl-md rounded-bl-md`} />
                        <button className='w-12 hover:bg-zinc-600 hover:text-white transition-colors border-l border-zinc-300 text-sm
                        hover:border-zinc-600 last:rounded-tr-md rounded-br-md'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            nav('/subjects/add')
                        }}
                        className='w-14 hover:bg-zinc-600 hover:text-white rounded-md transition-colors'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </nav>

            <main className='h-auto px-10 py-5 grid grid-cols-12 gap-2 '>
                {subject.map((val, key) => {
                    return (
                        <Node
                            key={key}
                            link={`/subjects/${val.subjectId}`}
                            title={val.courseCode}
                            subTitle={val.subjectTitle}
                            icon={faBook}
                        />
                    )
                })}
                {/* {subject.length === 0 ? <div className='col-span-4 h-[400px] flex justify-center items-center'>No subjects at the list</div> : ''} */}
            </main>
        </div>
    )
}

export default Subjects