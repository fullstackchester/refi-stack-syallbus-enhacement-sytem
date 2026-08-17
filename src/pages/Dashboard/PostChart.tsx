import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import type { Plugin } from 'chart.js'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase';
import { snapshotCollection } from '../../js/FirebaseData'
import type { Post } from '../../types/domain'

export default function PostChart() {

    const [post, setPost] = useState<Post[]>([])
    let approveCount = 0
    let reviewCount = 0
    let reviseCount = 0

    useEffect(() => {
        return onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                setPost(snapshotCollection<Post>(snapshot))
            }
        })

    }, [])


    post.forEach(a => {
        if (a.postStatus === 'Approved') {
            approveCount += 1
        } else if (a.postStatus === 'Needs reviewing') {
            reviewCount += 1
        } else {
            reviseCount += 1
        }
    })

    const plugins: Plugin<'doughnut'>[] = [{
        id: 'post-total',
        beforeDraw(chart) {
            const { ctx, chartArea: { top, width, height } } = chart
            ctx.save();
            ctx.font = 'bold 2rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            ctx.fillText(post.length.toString(), width / 2, height / 2 + top)
            ctx.restore()
        }
    }]

    const data = {
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [approveCount, reviewCount, reviseCount],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
    }
    return (
        <div className=' col-span-2 row-span-1 bg-white rounded-md flex flex-col'>
            <h1 className='p-3 text-sm font-semibold text-zinc-500'>Syllabus</h1>
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
