import React    from 'react';
import Link     from 'next/link';

const PageLinks = () => {
    return (
        <>
            <Link href='/'> Booking & Transfer </Link>
            <Link href='/contact'> Contact Us </Link>
            <Link href='/about'> About Us </Link>
            <Link href='/terms'> Terms & Conditions </Link>
        </>

    )

}

export default PageLinks;