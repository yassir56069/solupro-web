// app/terms/page.tsx
'use client'
import React        from 'react';

export default function AboutPage() {

  return (
    <main>
        <h1 className="flex font-edgeCutting text-white text-6xl  p-11  justify-center mt-[9rem] "> About Us</h1>
        <div className='flex justify-center items-center '> 
            <article className="bg-even-darker md:bg-white rounded-xl p-10 md:shadow-md w-[90%] md:w-[80%] m-4 text-white font-creatoDisplay font-thin md:text-blck">
                <p>
                    Established in 2017, <span className='text-main-acc-orange font-bold'>Solupro</span> quickly rose to prominence in the car
                    rental industry, fueled by a steadfast dedication to customer satisfaction and
                    value. Our seasoned team, with over a decade of experience, equips us with
                    the insight to excel in a competitive market.
                </p>
                &nbsp;
                <p>
                    At <span className='text-main-acc-orange font-bold'>Solupro</span>, we are driven to understand our clients' varied needs and
                    provide a tailored range of car rental solutions. Our dynamic team
                    consists of experienced professionals and enthusiastic individuals committed to
                    delivering a smooth experience for our clients. 
                </p>
                &nbsp;
                <p>
                    We stand for all-encompassing rental support. Our services include 24-hour
                    roadside assistance, breakdown support, comprehensive rental car insurance, and
                    prompt access to on-site fleet coordinators and technicians for vehicle issues,
                    accident reporting, replacements, and maintenance.
                </p>

            </article>
        </div>

    </main>
  );
}
