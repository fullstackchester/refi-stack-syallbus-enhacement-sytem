import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import type { Plugin } from 'chart.js'
import { subjects } from '../../js/Data'



export default function SubjectChart() {


    const plugins: Plugin<'doughnut'>[] = [{
        id: 'subject-total',
        beforeDraw(chart) {
            const { ctx, chartArea: { top, width, height } } = chart
            ctx.save();
            ctx.font = 'bold 2rem Roboto';
            ctx.fillStyle = '#52525b'
            ctx.textAlign = 'center'
            ctx.fillText(subjects.length.toString(), width / 2, height / 2 + top)
            ctx.restore()
        }
    }]

    const data = {
        labels: ['Subjects'],
        datasets: [{
            data: [subjects.length],
            backgroundColor: ['#4ade80', '#38bdf8', '#f87171'],
            pointStyle: 'circle'
        }],
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
