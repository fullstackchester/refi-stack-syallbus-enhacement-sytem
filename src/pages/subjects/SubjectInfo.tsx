import { onValue, ref } from 'firebase/database'
import { useEffect, useState, type MouseEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import Confirm from 'components/PopConfirmation'
import PopNotif from 'components/PopNotif'
import Button from 'components/Template/Button'
import { database } from 'clients/Firebase'
import { snapshotValue } from 'utils/FirebaseData'
import { useFirebase } from 'context/FirebaseContext'
import type { Subject } from 'types/domain'

export default function SubjectInfo() {

    const { id } = useParams()
    const [subject, setSubject] = useState<Subject | null>(null)
    const [isOpen, setOpen] = useState(false)
    const [actionDone, setActionDone] = useState(false)
    const { role, deleteData } = useFirebase()
    const nav = useNavigate()

    useEffect(() => {
        return onValue(ref(database, `subject/${id}`), snap => {
            if (snap.exists()) {
                setSubject(snapshotValue<Subject>(snap))
            }
        })
    }, [id])

    function DeleteSubject(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        deleteData(`subject/${id}`)
            .then(() => {
                setOpen(false)
                setActionDone(true)
            }).catch((err) => {
                setActionDone(true)
                console.log(err)
            });
    }


    return (
        <>
            <Confirm
                isOpen={isOpen}
                dedicatedFunction={DeleteSubject}
                handleClose={() => setOpen(false)}
                dialogTitle='Confirm Delete'
                dialogMessage={`Are you sure you want to delete subject ${subject?.subjectTitle ?? ''}?`}
                buttonTitle='Delete' />

            <PopNotif
                isOpen={actionDone}
                handleClose={() => {
                    setActionDone(false)
                    nav('/subjects')
                }}
                dialogTitle='Delete Successful'
                dialogMessage='Subject deleted successfully' />

            <div className='h-14 flex flex-row items-center border-b border-zinc-100 text-sm
             text-zinc-600 px-5 font-semibold'>
                Information
            </div>
            <div className='flex-1 p-5 overflow-y-auto'>
                <div className='text-zinc-700 text-2xl font-semibold'>{`Subject Code: ${subject?.courseCode ?? ''}`}</div>
                <div className='text-zinc-700 text-sm font-medium'>{`Subject Title: ${subject?.subjectTitle ?? ''}`}</div>
                <div className='text-zinc-700 text-sm font-medium'>{`Credit Units: ${subject?.creditUnits ?? ''}`}</div>
                <div className='text-zinc-700 text-sm text-justify mt-5'>{subject?.subjectDescription}</div>
            </div>
            <div className='h-14 flex items-center justify-end px-5 border-t border-zinc-100'>
                {role !== 'faculty' &&
                    <Button
                        color={'red'}
                        onClick={() => setOpen(true)}
                        title='Delete' />}
                {role !== 'faculty' &&
                    <Button
                        color={'sky'}
                        onClick={() => nav(`/subjects/${id}/edit`)}
                        title='Edit Subject' />}
            </div>
        </>
    )
}
