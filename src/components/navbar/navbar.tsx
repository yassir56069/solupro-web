'use client'

import React, { useState, useEffect } from 'react';
import Logo from '../logo'
import { Button } from 'react-aria-components';
import PageLinks from './pagelinks';

const DesktopNav = () => {
    return (
        <div className='stick top-0 z-[20] mx-auto flex items-center justify-between w-full pb-1 pt-2 pl-4 pr-16'>
            <Logo />
            <nav className='w-2/3'>
                <div className='flex justify-between'> 
                    <PageLinks />
                </div>
            </nav>
        </div>
    );
};

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='relative'>
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
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={toggleNavbar}
            ></div>

            {/* Sliding menu */}
            <div 
                className={`fixed top-0 left-0 h-full w-2/3 bg-main-acc-blue shadow-lg transform transition-transform duration-300 ease-in-out ${
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

const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="relative">
            <div className='text-white md:bg-main-acc-blue overflow-hidden transition-all duration-300 ease-in-out'>
                <div className={`transition-all duration-200 ease-in-out ${isMobile ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                    <DesktopNav />
                </div>
                <div className={`transition-all duration-200 ease-in-out ${isMobile ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                    <MobileNav />
                </div>
            </div>
        </header>
    );
}

export default Navbar;