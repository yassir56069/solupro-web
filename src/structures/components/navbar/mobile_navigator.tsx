import React, { useState, useEffect } from 'react';

import Logo                           from '../instantiate-logo'
import PageLinks                      from '../instantiate-page-link';


const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className=' h-24'>
            <div className='flex justify-center items-center p-4'>
                <button 
                    onClick={toggleNavbar}
                    className='text-2xl z-50'
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>
                <div className='flex-grow flex justify-center'> <Logo /> </div>
            </div>

            {/* Overlay */}
            <div 
                className={`fixed 
                    inset-0 
                    bg-black bg-opacity-50 backdrop-blur-sm 
                    transition-opacity duration-300 ease-in-out 
                    ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={toggleNavbar}
            ></div>

            {/* Sliding menu */}
            <div 
                className={`fixed top-0 left-0 h-full w-2/3 
                    bg-main-acc-blue shadow-lg 
                    transform transition-transform duration-300 ease-in-out 
                    ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <button 
                    onClick={toggleNavbar}
                    className='absolute top-4 right-4 text-2xl'
                    aria-label="Close navigation"
                >
                    ×
                </button>
                <div className='flex flex-col border-spacing-2 p-8 mt-16 space-y-6'>
                    <PageLinks />
                </div>
            </div>
        </nav>
    );
}

export default MobileNav;