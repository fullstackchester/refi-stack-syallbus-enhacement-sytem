import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';


export default function Layout() {
    return (
        <div className='w-full h-auto flex flex-row'>
            <Sidebar />
            <div className='h-auto flex-1'>
                <Header />
                <div className='w-full h-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
