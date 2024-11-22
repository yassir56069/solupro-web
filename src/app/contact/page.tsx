// app/terms/page.tsx
'use client'
import React        from 'react';
import Image        from 'next/image';

export default function ContactPage() {

    const LOCATION_IMAGE = 'https://utfs.io/f/wkZXy01VKbheBhRB6MlmaQy4pbJYC67tKkSPLxFXcZz5HAv0';

    return (
        <main>
            <h1 className="flex font-edgeCutting text-white text-6xl  p-11  justify-center mt-[9rem] "> Contact Us </h1>
            <div className='flex flex-col md:flex-row  justify-center items-center '> 
                <section className="flex justify-center items-center   rounded-xl w-full md:w-[30%] text-white font-creatoDisplay font-thin md:text-blck">
                    <Image aria-label='image' className='rounded-xl' src={LOCATION_IMAGE} alt='location image' width={380} height={380} unoptimized priority={true}/>
                </section>

                <section className="flex flex-col gap-5 bg-even-darker md:bg-white text-white md:text-blck rounded-xl p-10 md:shadow-md w-[90%] md:w-[60%] m-4 font-creatoDisplay  text-lg font-thin h-full">                    
                    <div className='flex'>
                        <svg className='mr-3' height={24} width={24} fill="currentColor">
                        <use href={`/icons/sprite.svg#location_on-filled`} />
                        </svg>
                        <p> Dulloo Lane, Closel, Phoenix, Mauritius. </p>    
                    </div>
                    <div className='flex'>
                        <svg className='mr-[0.6rem]' height={24} width={24} fill="currentColor">
                        <use href={`/icons/sprite.svg#local_phone-filled`} />
                        </svg>
                        <p> +230 606 9000 </p>    
                    </div>
                    <div className='flex'>
                        <svg className='mr-3' height={24} width={24} fill="currentColor">
                        <use href={`/icons/sprite.svg#email-filled`} />
                        </svg>
                        <p> info@solupro.ltd </p>    
                    </div>
                </section>
            </div>

        </main>
    );
}
