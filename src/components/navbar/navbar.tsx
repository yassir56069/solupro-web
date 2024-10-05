'use client'

import React, { useState } from 'react';
import Logo from '../logo'
import {Button} from 'react-aria-components';



import PageLinks from './pagelinks';


const DesktopNav = () => {
    return (
        <div className='stick top-0 z-[20] mx-auto  flex items-center justify-between w-full pb-1 pt-2 pl-4 pr-16'>
            <Logo/>
            <nav className='hidden md:block w-2/3'>
                <div className='flex justify-between'> 
                    <PageLinks/>
                </div>
            </nav>
        </div>

    );

};

const MobileNav = () => {
    const[isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className='flex justify-center items-center p-4'>
            <button 
                onClick={toggleNavbar}
                className='text-2xl'
                aria-label="Toggle navigation"
            >
            ☰
            </button>

            <div  className='flex-grow flex justify-center'> <Logo/> </div>

            {isOpen && (
                
                <div>
                    <PageLinks/>
                </div>
            )}
        </nav>
    );
}


const Navbar: React.FC = () => {
    return (


    <header>
        
        <div className=' text-white'>
            
            <div className='hidden md:flex bg-main-acc-blue'>
            <DesktopNav/>
            </div>

            <div className='md:hidden'>
            <MobileNav/>
            </div>

        </div>


    </header>


    );
}

export default Navbar;