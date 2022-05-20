import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { orderByValue, equalTo, onValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { useFirebase } from '../../js/FirebaseContext';


export default function UserChart() {
    const [admin, setAdmin] = useState(0)
    const [areaChair, setAreaChair] = useState(0)
    const [faculty, setFaculty] = useState(0)
    let total = 0

    const { role, currentUser } = useFirebase()
    const [dept, setDept] = useState()

    const uid = currentUser.uid
    
    useEffect(() => {

        onValue(ref(database, `users/${uid}`), snap => {
            if (snap.exists()) {
                setDept(snap.val().department)
            }
        })

        onValue(ref(database, 'users/'), snapshot => {
            if (snapshot.exists()) {
                total = Object.values(snapshot.val()).length
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
        })
    }, [])

    const plugins = [{
        beforeDraw: function (chart, args, options) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            ctx.save();
            ctx.font = 'bold 2rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            var text = total;
            ctx.fillText(text, width / 2, height / 2 + top);

        }
    }]

    const data = {
        labels: ['Admin', 'Area Chair', 'Faculty'],
        datasets: [{
            data: [admin, areaChair, faculty],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171']
        }]
    }


    return (
        <div className=' col-span-2 row-span-1 bg-white rounded-md flex flex-col'>
            <h1 className='p-3 text-sm font-semibold text-zinc-500'>Users</h1>
            <div className='flex-1 w-full'>
                <Doughnut
                    data={data}
                    options={{ maintainAspectRatio: false }}
                    plugins={plugins} />
            </div>
            <div className='h-10'>

            </div>
        </div>
    )
}
