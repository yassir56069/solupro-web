import React                from 'react';
import { ChevronDownIcon }  from "@heroicons/react/16/solid";

import Backdrop             from './components/instantiate-backdrop';



const TextSplashPage = ({bookingFormRef}:any) => {

    const scrollToBookingForm = () => {
        const element = bookingFormRef.current;
        const offset = 155; 
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition - offset;
    
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    };

    return (  
        <section className="flex flex-col min-h-screen text-white justify-center items-center text-center">
                {/* hide on mobile */}
                <div className="hidden md:block"> 
                    <Backdrop/>
                </div>

            <h1 className="font-edgeCutting text-6xl  p-8"> The Best Car Hire Deals In Mauritius. </h1>
            <p className="flex flex-col max-w-lg justify-center items-center text-center">
                Discover Mauritius hassle-free with our affordable and reliable car rental service. Whether you're a tourist or a local, enjoy safe, well-maintained vehicles for the best island adventure at your own pace.
            </p>
            <map 
                onClick={scrollToBookingForm} 
                className={`
                flex flex-col 
                justify-center items-center pt-8 
                transition duration-300 ease-in 
                hover:opacity-30 hover:cursor-pointer
                `}
            >
                <ChevronDownIcon className="h-6 w-6 "/>
                <p>  book now </p>
            </map>
        </section>
    );
};

export default TextSplashPage;  