import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { orderByValue, equalTo, onValue, query, ref } from 'firebase/database'
import { database } from '../../js/Firebase';

export default function PostChart() {

    const [approve, setApprove] = useState(0)
    const [revise, setRevise] = useState(0)
    const [review, setReview] = useState(0)
    let total = 0

    useEffect(() => {
        return onValue(ref(database, 'posts'), snapshot => {
            if (snapshot.exists()) {
                // setPosts(Object.values(snapshot.val()))
                total = Object.values(snapshot.val()).length
                Object.values(snapshot.val()).map((value) => {
                    if (value.postStatus === 'Approved') {
                        setApprove((prev) => prev + 1)
                    } else if (value.postStatus === 'Needs revisions') {
                        setRevise((prev) => prev + 1)
                    } else {
                        setReview((prev) => prev + 1)
                    }
                })
            } else {
                console.log('Invalid query')
            }
        }, {
            onlyOnce: true
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
        labels: ['Approved', 'Needs Reviews', 'Need Revisions'],
        datasets: [{
            data: [approve, review, revise],
            backgroundColor: ['#16A34A', '#0284C7', '#DC2626'],
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
