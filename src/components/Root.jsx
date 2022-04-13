import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <div className='w-full h-auto bg-zinc-50'>
            <Outlet />
        </div>
    )
}
