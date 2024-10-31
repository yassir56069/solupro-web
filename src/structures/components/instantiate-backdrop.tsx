
const backgroundImageURL = 'https://utfs.io/f/wkZXy01VKbhezpJAKVdaFydKfXSl8bU3HBNmRTuAM7sIwc9L';

export default function Backdrop () {
    return ( 
        <>
        <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
                backgroundImage: `url(${backgroundImageURL})`,
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