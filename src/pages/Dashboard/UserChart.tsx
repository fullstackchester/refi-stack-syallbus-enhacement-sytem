import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import type { Plugin } from 'chart.js'
import { onValue, ref } from 'firebase/database'
import { database } from 'clients/Firebase'
import { snapshotCollection } from 'utils/FirebaseData'
import type { UserProfile } from 'types/domain'


export default function UserChart() {
    const [admin, setAdmin] = useState(0)
    const [areaChair, setAreaChair] = useState(0)
    const [faculty, setFaculty] = useState(0)
    useEffect(() => {
        return onValue(ref(database, 'users/'), snapshot => {
            if (snapshot.exists()) {
                let nextAdmin = 0
                let nextAreaChair = 0
                let nextFaculty = 0
                snapshotCollection<UserProfile>(snapshot).forEach((v) => {
                    if (v.userType === 'administrator') {
                        nextAdmin += 1
                    } else if (v.userType === 'faculty') {
                        nextFaculty += 1
                    } else {
                        nextAreaChair += 1
                    }
                })
                setAdmin(nextAdmin)
                setAreaChair(nextAreaChair)
                setFaculty(nextFaculty)
            }
        })
    }, [])

    const total = admin + areaChair + faculty
    const plugins: Plugin<'doughnut'>[] = [{
        id: 'user-total',
        beforeDraw(chart) {
            const { ctx, chartArea: { top, width, height } } = chart
            ctx.save();
            ctx.font = 'bold 2rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            ctx.fillText(total.toString(), width / 2, height / 2 + top)
            ctx.restore()
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
