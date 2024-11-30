import React            from 'react';
import Link             from 'next/link';


const PageLinks = ({ onLinkClick }:any) => {
    const links = [
        { href: "/", label: "Booking & Transfer" },
        { href: "/contact", label: "Contact Us" },
        { href: "/about", label: "About Us" },
        { href: "/terms", label: "Terms & Conditions" },
    ];


    return (
        <>
            {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => onLinkClick(link.href)}> {link.label} </Link>
                
            ))}
        </>

    )

}
export default PageLinks;


