import React from 'react'
import Alert from './Alert'
import TextField from './Inputs/TextField'

const Form = ({
    handleSubmit,
    handleError,
    inputFields,
    headings,
    buttonTitle,
    children
}) => {
    return (
        <form
            className='w-full h-full flex flex-col'
            onSubmit={handleSubmit && handleSubmit} >
            {headings && <h1 className='text-3xl text-zinc-600 font-medium mb-8 text-center'>{headings}</h1>}
            {children}
            {inputFields && inputFields.map((val, key) => {
                return (
                    <TextField
                        key={key}
                        name={val.name}
                        label={val.label}
                        placeholder={val.placeholder}
                        type={val.type}
                        onChange={val.onChange}
                        required={val.required}
                    />
                )
            })}

            <button
                className='bg-zinc-700 outline-none p-3 text-white text-sm rounded-lg'
                type='submit'>{buttonTitle}</button>
            {handleError && <Alert
                className='w-full'
                alertMsg={handleError} />}
        </form>
    )
}

export default Form