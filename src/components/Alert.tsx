
interface AlertProps {
    className?: string
    alertMsg: string
}

function Alert(
    {
        className,
        alertMsg
    }: AlertProps
) {
    return (
        <div className={className}>
            <div className='p-2 border border-red-200 bg-red-100 rounded-ld m-1 rounded-md'>
                <p className='w-full h-auto text-right text-red-500 text-sm font-medium'>{alertMsg}</p>
            </div>
        </div>
    )
}

export default Alert
