import React, { useState, useEffect } from 'react'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { onValue, ref } from 'firebase/database'
import { database } from '../../js/Firebase'
import { Doughnut } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { subjects } from '../../js/Data'



export default function SubjectChart() {


    const plugins = [{
        beforeDraw: function (chart, args, options) {
            const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
            ctx.save();
            ctx.font = 'bold 2rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            var text = subjects.length.toString();
            ctx.fillText(text, width / 2, height / 2 + top);

        }
    }]

    const data = {
        labels: ['Subjects'],
        datasets: [{
            data: [subjects.length],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
        plugins: [plugins]
    }


    return (
        <div className=' col-span-2 row-span-1 bg-white rounded-md flex flex-col'>
            <h1 className='p-3 text-sm font-semibold text-zinc-500'>Subjects</h1>
            <div className='flex-1 w-full flex flex-col'>
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
