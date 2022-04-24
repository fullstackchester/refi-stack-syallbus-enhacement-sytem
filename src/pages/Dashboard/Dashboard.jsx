import React, { useRef, useState } from 'react'
import LoadingButton from '../../components/LoadingButton'
import PostStatus from '../../components/PostStatus'


function Dashboard() {

    const [loading, setLoading] = useState(false)

    return (
        <div className='w-full h-[600px] border border-red-600 flex justify-center items-center'>
            <PostStatus postStatus={'Approved'} textSize={`text-xs`} />
        </div>

    )
}

export default Dashboard