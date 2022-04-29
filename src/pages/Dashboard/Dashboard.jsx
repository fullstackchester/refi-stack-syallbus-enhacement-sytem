import { onValue, ref } from 'firebase/database'
import React, { useRef, useState, useEffect } from 'react'
import { database, storage } from '../../js/Firebase'
import { getDownloadURL, ref as StorageRef } from 'firebase/storage';



function Dashboard() {

    return (
        <div className='w-full h-[600px] border border-red-600 flex justify-center items-center'>
            
        </div>

    )
}

export default Dashboard