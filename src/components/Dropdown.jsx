import React from 'react'

function Dropdown(
    {
        required,
        name,
        label,
        formName,
        selectables,
        onChange
    }
) {
    return (
        <div className='flex flex-col mb-3'>
            <label
                htmlFor={name}
                className='text-sm text-zinc-500 font-medium' >
                {label} {required ? <span className='h-fit text-lg text-sky-600'>*</span> : ''}
            </label>
            <select
                name={name}
                form={formName}
                required={required}
                onChange={onChange}
                placeholder='Select Department'
                className='outline-none border border-zinc-300 rounded-md p-3
                text-zinc-700 text-sm focus:border-sky-600 focus:ring-1 focus:ring-sky-600'>
                {selectables && selectables.map((val, key) => {
                    return (
                        <option
                            className='text-sm'
                            selected={val.selected && val.selected}
                            key={key} value={val.value}>{val.title}</option>
                    )
                })}
            </select>
        </div>


    )
}
export default Dropdown