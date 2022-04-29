import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { database } from '../js/Firebase'

export default function History(
    { postId }
) {
    const [history, setHistory] = useState([])
    useEffect(() => {
        onValue(ref(database, `history/${postId}`), history => {
            setHistory(Object.values(history.val()))
        })
    }, [])

    console.table(history)
    return (
        <div
            className={`flex flex-col`}>

            {history.map((val, key) =>
                <div
                    key={key}
                    className='h-auto border-b border-zinc-200 text-xs font-medium p-2'>
                    {`Edited: ${val.historyDate}`}
                </div>
            )}

        </div>
    )
}
