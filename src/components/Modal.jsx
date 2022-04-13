import React from 'react'
import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'

const Modal = ({ handleClose, children }) => {

    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={handleClose}>
                    <div
                        onClick={(e) => e.stopPropagation()} // stopPropagation prevents modal from closing when modal content was clicked
                        className='w-[400px] h-auto bg-white rounded-xl p-5 z-50'>
                        {children}
                    </div>
                </Backdrop>,
                document.getElementById('modal-root')
            )}
        </>
    )
}

export default Modal