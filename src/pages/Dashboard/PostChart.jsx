import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { orderByValue, equalTo, onValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase';

export default function PostChart() {

    const [post, setPost] = useState([])
    let total = 0
    let approveCount = 0
    let reviewCount = 0
    let reviseCount = 0


    useEffect(() => {
        return onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                total = Object.values(snapshot.val()).length
                setPost(Object.values(snapshot.val()))
            } else {
                console.log('Invalid query')
            }
        }, {
            onlyOnce: true
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
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [approveCount, reviewCount, reviseCount],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
        plugins: [plugins]
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
