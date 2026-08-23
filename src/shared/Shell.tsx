import { Outlet } from 'react-router';
import GlobalHeader from './GlobalHeader'
import Sidebar from './Sidebar';


export default function Shell() {
    return (
        <div className='w-full h-auto flex flex-row border-4 border-red-600'>
            <Sidebar/>
            <div className='h-auto flex-1'>
                <GlobalHeader></GlobalHeader> 
                <div className='w-full h-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
