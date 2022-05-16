import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { orderByValue, equalTo, onValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase'


export default function UserChart() {
    const [admin, setAdmin] = useState(0)
    const [areaChair, setAreaChair] = useState(0)
    const [faculty, setFaculty] = useState(0)


    useEffect(() => {
        return onValue(ref(database, 'users/'), snapshot => {
            if (snapshot.exists()) {
                Object.values(snapshot.val()).map((v) => {
                    if (v.userType === 'administrator') {
                        setAdmin(prev => prev + 1)
                    } else if (v.userType === 'faculty') {
                        setFaculty(prev => prev + 1)
                    } else {
                        setAreaChair(prev => prev + 1)
                    }
                })
            }
        }, {
            onlyOnce: true,
        })
    }, [])

    const data = {
        labels: ['Admin', 'Area Chair', 'Faculty'],
        datasets: [{
            data: [admin, areaChair, faculty],
            backgroundColor: ['#16A34A', '#0284C7', '#DC2626']
        }]
    }


    return (
        <div className=' col-span-2 bg-white rounded-md h-80 flex flex-col'>
            <h1 className='p-3 text-sm font-semibold text-zinc-500'>Users</h1>
            <div className='flex-1 w-full'>
                <Doughnut data={data} options={{ maintainAspectRatio: false }} />
            </div>
            <div className='h-10'>

            </div>
        </div>
    )
}
