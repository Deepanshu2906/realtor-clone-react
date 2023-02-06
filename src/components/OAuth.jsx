import React from 'react'
import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
    return (
        <button className='flex  justify-center items-center w-full bg-red-600 text-white py-3 px-7 uppercase text-sm font-medium hover:bg-red-700 active:bg-red-800 shadow:md hover:shadow:xl tracking-widest rounded'>
            <FcGoogle className='text-2xl mr-2 bg-white rounded-full' />
            Continue with Google</button>
    )
}

export default OAuth