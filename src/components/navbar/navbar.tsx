import React from 'react';
import Logo from "../logo";

import PageLink from './pagelink';


const Navbar: React.FC = () => {
    return (
       <header className='bg-main-acc-blue stick top-0 z-[20] mx-auto flex w-full items-center justify-between pb-1 pt-7 pl-4 pr-4'>
        <Logo/>
        <ul className='text-white'>
            <PageLink href="/" page_name="Booking & Transfer"/>
            <PageLink href="/" page_name="Contact Us"/> 
            <PageLink href="/" page_name="About Us"/> 
        </ul>
       </header>
    );
}

export default Navbar;