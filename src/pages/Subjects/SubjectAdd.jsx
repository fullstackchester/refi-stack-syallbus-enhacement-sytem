import React, { useState } from 'react'
import Form from '../../components/Form'
import { v4 as uuidv4 } from 'uuid'
import { useFirebase } from '../../js/FirebaseContext'

export const SubjectAdd = () => {
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const { writeData } = useFirebase()

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
    const newSubject = {
        subjectId: uuidv4(),
        courseCode: courseCode,
        subjectTitle: subjectTitle,
        creditUnits: creditUnit,
        subjectDescription: courseDescription
    }

    function addSubject(e) {
        e.preventDefault()
        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                alert('Subject added.')
            }).catch(() => {
                alert('Subject failed to add.')
            });
    }
    return (
        <div className='w-full h-auto flex justify-center'>
            <div className='w-[500px] min-h-[600px] p-5'>
                <h1 className='text-4xl text-zinc-600 mb-5'>New subject</h1>
                <Form
                    inputFields={AddSubjectData}
                    handleSubmit={addSubject}
                    buttonTitle='Add subject'
                />
            </div>
        </div>
    )
}
