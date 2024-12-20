'use client'

import React, { useState, useEffect }   from 'react';

import MobileNav                        from './components/navbar/navigator-mobile';
import DesktopNav                       from './components/navbar/navigator-desktop';

const Navbar: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="fixed z-50 top-0 left-0 w-full h-24">
            <section 
                className={`
                text-white font-creatoDisplay font-light 
                bg-mobile-acc-blue md:bg-main-acc-blue 
                transition-all duration-300 ease-in-out
                `}
            >
                <div className={`'transition-all duration-200 ease-in-out' ${isMobile ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
                    <DesktopNav />
                </div>
                <div className={`'transition-all duration-200 ease-in-out' ${isMobile ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
                    <MobileNav />
                </div>
            </section>
        </header>
    );
}

export default Navbar;