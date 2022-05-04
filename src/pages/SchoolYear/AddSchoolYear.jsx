import React, { useState } from 'react'
import LoadingButton from '../../components/LoadingButton'

export default function AddSchoolYear() {
    const [loading, setLoading] = useState(false)
    return (
        <div className={`w-full h-auto py-5 px-10 flex justify-center`}>
            <div className={`w-[80%] h-auto min-h-[600px] flex flex-col border border-zinc-200 bg-white rounded-md`}>
                <header className={`h-16 border-b flex items-center px-10`}>

                </header>
                <main className={`flex-1 border-b border-zinc-200 flex justify-center`}>

                </main>
                <footer className={`h-14 flex items-center justify-end px-10`}>
                    <LoadingButton title={`Add`} loadingState={loading}
                        dedicatedFunc={() => {
                            setLoading(true)
                        }} />
                </footer>
            </div>
        </div>
    )
}
