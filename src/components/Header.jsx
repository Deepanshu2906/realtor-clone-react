import React from 'react'
import { useLocation, useNavigate } from 'react-router';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true;
        }
    }

    return (
        <div className='border-b shadow-md bg-white'>
            <header className=' flex justify-between items-center px-3 md:max-w-6xl md:mx-auto'>
                <div>
                    <img className='h-5 cursor-pointer' src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" onClick={() => navigate('/')} />
                </div>
                <div>
                    <ul className='flex space-x-10'>
                        <li className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-red-500"}`} onClick={() => navigate('/')}>Home </li>
                        <li className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "text-black border-b-red-500"}`} onClick={() => navigate('/offers')}>Offers</li>
                        <li className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${pathMatchRoute("/sign-in") && "text-black border-b-red-500"}`} onClick={() => navigate('/sign-in')}>Sign in</li>
                    </ul>
                </div>
            </header >
        </div >
    )
}

export default Header