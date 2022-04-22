import React, { Fragment, useState, useRef } from 'react'

export default function Files() {


    return (
        <div className='w-full h-[600px] flex justify-center items-center border border-red-600'>
            <label
                htmlFor='img'>
                <span>Select Avatar</span>
                <input id='img' type={`file`} accept={`image/*`} />
            </label>
        </div>

    )
}   