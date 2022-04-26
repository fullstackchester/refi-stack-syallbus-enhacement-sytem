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
import Navbar from '../../components/Navbar'

function Subjects() {


    const [visible, setVisible] = useState(false)
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const [search, setSearch] = useState('')
    const [subject, setSubject] = useState([])
    const nav = useNavigate()


    const { writeData } = useFirebase()
    const newSubject = {
        subjectId: uuidv4(),
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit,
        subjectDescription: courseDescription
    }


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
            <Navbar
                headerTitle={`Subjects`}
                buttonOnClick={() => nav('/subjects/add')}
                searchBarOnChange={(e) => setSearch(e.target.value)} />

            <main className='h-auto px-10 py-5 grid grid-cols-12 gap-2 '>
                {subject
                    .filter(entry => Object.values(entry).some(val => typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())))
                    .map((val, key) => {
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
            </main>
        </div>
    )
}

export default Subjects