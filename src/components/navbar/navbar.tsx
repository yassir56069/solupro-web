import React from 'react';

import Logo from "../logo";

const Navbar: React.FC = () => {
    return (
       <nav className='bg-main-acc-blue stick top-0 z-[20] mx-auto flex w-full items-center justify-between pb-1 pt-7 pl-4 pr-4'>
        <Logo/>
        <h1>Header </h1>
       </nav>
    );
}

export default Navbar;