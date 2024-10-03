import Link from 'next/link';

const PageLink = ({href, page_name}:any) => {
    return (
        <li>
            <Link href={href}> <a> {page_name} </a></Link>
        </li>
    )

}

export default PageLink;