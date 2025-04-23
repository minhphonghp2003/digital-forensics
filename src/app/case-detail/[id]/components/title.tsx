import React from 'react'
import { CiEdit } from 'react-icons/ci'

function Title({ id }: { id: string }) {
    return (
        <div><div className='flex justify-between text-lg items-center  my-4'>

            <p className='flex items-center gap-3 font-bold my-4 text-xl'>
                Case #{id} <CiEdit color='orange' />

            </p>
            <p>
                Title: <span className=''>
                    This is a title of the case that is being created. It is a long title that will be used to test the case creation process.
                </span>
            </p>
        </div></div>
    )
}

export default Title