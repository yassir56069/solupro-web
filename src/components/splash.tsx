import { ChevronDownIcon } from "@heroicons/react/16/solid";

const bg_image_link = 'https://utfs.io/f/wkZXy01VKbhezpJAKVdaFydKfXSl8bU3HBNmRTuAM7sIwc9L';

function Backdrop () {
    return ( 
        <>
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
                backgroundImage: 'url(https://utfs.io/f/wkZXy01VKbhezpJAKVdaFydKfXSl8bU3HBNmRTuAM7sIwc9L)',
                backgroundSize: '1300px ',
                backgroundRepeat: 'no-repeat',
                zIndex: -2 // Ensure this is behind the overlay
            }}
        />
        
        {/* Overlay for multiply effect */}
        <div 
            className="absolute inset-0  bg-black" 
            style={{ zIndex: -1 }} // Overlay above the background image
        />
    </>

    );
}


function Splash({ bookingFormRef }:any) {

    const scrollToBookingForm = () => {
        bookingFormRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Align to the top of the viewport
        });
      };

    return (  
        <section className="flex flex-col text-white justify-center items-center text-center min-h-nav-adjust">
                {/* hide on mobile */}
                <div className="hidden md:block"> 
                    <Backdrop/>
                </div>

            <h1 className="font-edgeCutting text-6xl  p-8"> The Best Car Hire Deals In Mauritius. </h1>
            
            <map onClick={scrollToBookingForm} className="flex flex-col justify-center items-center pt-8">
                <ChevronDownIcon className="h-6 w-6"/>
                <p>  book now </p>
            </map>
        </section>
    );
}

export default Splash;