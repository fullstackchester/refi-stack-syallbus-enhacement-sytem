import React from 'react'

function NotFound() {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <main className='w-[400px] h-auto p-5 border border-zinc-100 rounded-lg shadow-md'>
                <h2 className='text-3xl text-zinc-600 font-semibold'>Error 404</h2>
                <p>Page not found</p>
            </main>
        </div>
    )
}

export default NotFound