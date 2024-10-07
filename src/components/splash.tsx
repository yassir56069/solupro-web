import { ChevronDownIcon } from "@heroicons/react/16/solid";

function Splash() {
    return (  
        <section className="flex flex-col text-white justify-center items-center text-center min-h-screen">
            <h1 className="font-edgeCutting text-6xl  p-8"> The Best Car Hire Deals In Mauritius. </h1>
            
            <map className="flex flex-col justify-center items-center pt-8">
                <ChevronDownIcon className="h-6 w-6"/>
                <p>   book now </p>
            </map>

        </section>
    );
}

export default Splash;