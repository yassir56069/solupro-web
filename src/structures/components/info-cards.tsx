
function InfoCard() {
    return (    

        <div className="font-creatoDisplay text-white md:text-blck w-full md:w-[83.5%]  p-3 pb-[5rem] md:p-0 md:pb-5 md:mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-4  md:h-40">

                <section className="bg-even-darker md:bg-white rounded-lg md:shadow-lg shadow-md p-4">
                    <h1 className="text-2xl">Why customers prefer us</h1>
                    <ol  className=" font-light list-disc ml-8">
                        
                        <li> Friendly and reliable service. </li>
                        <li> No hidden fees or charges. </li>
                        <li> High quality vehicles with good maintenance.</li>
                        <li> Always on time.</li>
                    </ol>
                </section>


                <section className="bg-even-darker md:bg-white rounded-lg md:shadow-lg shadow-md p-4">
                    <h1 className="text-2xl">Booking & Transfer Services</h1>
                    <p className="font-light">
                        Solupro is committed to providing to it's customers a reliable and consistent booking service as well as an airport pick-up transfer service for it's customers.
                        We provide these services at an affordable premium at your own leisure.
                    </p>
                </section>
            </div>
        </div>

    );
}

export default InfoCard;