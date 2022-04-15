import React from 'react'
import { motion } from 'framer-motion'
import TextField, { PanelTextField } from './Inputs/TextField'

function AddPanel(
    {
        handleClose,
        onSubmit,
        title,
        inputFields,
        submitTitle,
        // props for how many data should be inputed, then map and render to the div
    }
) {
    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            spellCheck='false'
            name='panel-form'
            id='panel-form'
            onSubmit={onSubmit && onSubmit}
            className='w-full h-auto bg-white border-b border-zinc-200 p-2'>

            <h3 className='text-2xl text-zinc-500 px-2'>{title}</h3>
            {/* <PanelTextField className='w-60 flex flex-col' name='course-code' label='Course code' placeholder='IT 101' type='text' /> */}
            <div className='p-2 grid grid-cols-3 gap-3'>

                {inputFields && inputFields.map((val, key) => {
                    return (
                        <PanelTextField
                            key={key}
                            name={val.name}
                            label={val.label}
                            placeholder={val.placeholder}
                            type={val.type}
                            onChange={val.onChange}
                            formName='panel-form'
                            required={val.required}
                            className='col-span-1 row-span-1 flex flex-col' />
                    )
                })}
            </div>
            <div className='px-2 py-4 flex justify-end'>
                <button
                    onClick={handleClose}
                    className='bg-zinc-600 text-xs text-white p-2 outline-none rounded-md hover:bg-zinc-500 mr-3'
                    form='panel-form'>Cancel</button>
                <button
                    type='submit'
                    className='bg-sky-600 text-xs text-white p-2 outline-none rounded-md hover:bg-sky-700'
                    form='panel-form' >{submitTitle} </button>

            </div>


        </motion.form>
    )
}

export default AddPanel