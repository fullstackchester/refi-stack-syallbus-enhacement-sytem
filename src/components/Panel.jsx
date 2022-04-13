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
            onSubmit={onSubmit && onSubmit}
            className='w-full h-auto bg-stone-50 p-2'>
            <h3 className='text-lg font-medium text-zinc-500'>{title}</h3>
            {/* <PanelTextField className='w-60 flex flex-col' name='course-code' label='Course code' placeholder='IT 101' type='text' /> */}
            <div className='p-2 flex flex-row justify-between '>

                {inputFields && inputFields.map((val, key) => {
                    return (
                        <PanelTextField
                            key={key}
                            name={val.name}
                            label={val.label}
                            placeholder={val.placeholder}
                            type={val.type}
                            onChange={val.onChange}
                            className='w-60 flex flex-col' />
                    )
                })}
            </div>

            <div className='w-48 flex flex-row justify-evenly mt-4 place-self-end  '>
                <button className='w-20 text-xs text-zinc-300 border border-zinc-300 p-2 rounded-lg' onClick={handleClose}>Close</button>
                <button type='submit' className='w-20 text-xs text-white bg-sky-600 p-2 rounded-lg'>{submitTitle}</button>
            </div>
        </motion.form>
    )
}

export default AddPanel