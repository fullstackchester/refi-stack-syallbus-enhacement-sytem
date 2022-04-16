import React, { useState, useEffect } from 'react'
import AddPanel from '../../components/Panel'
import { useFirebase } from '../../js/FirebaseContext'
import { ref, onValue } from 'firebase/database'
import { database } from '../../js/Firebase'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faAdd } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Node from '../../components/Node'

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
        <div className='min-h-[1000px] h-auto  rounded-lg'>
            <nav className='h-14  flex flex-row justify-between py-2 px-4'>
                <span className='text-xl flex items-center font-medium text-zinc-600 poppins'>Subjects</span>

                <ul className='text-zinc-700 flex flex-row items-center p-2'>
                    <li className='text-xl cursor-pointer'>
                        <FontAwesomeIcon
                            icon={faAdd}
                            onClick={() => nav('/subjects/add')} />
                    </li>
                </ul>
            </nav>

            <main className=' h-auto p-4 grid grid-cols-12 gap-2'>
                {subject && subject.map((val, key) => {
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
            <footer className='h-14'></footer>
        </div>
    )
}

export default Subjects