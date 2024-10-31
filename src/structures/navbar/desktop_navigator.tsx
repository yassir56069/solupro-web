import Logo                           from '../components/instantiate-logo'
import PageLinks                      from '../components/instantiate-page-link';


const DesktopNav = () => {
    return (
        <div className='h-24 stick top-0 z-50 mx-auto flex items-center justify-between w-full pb-1 pt-2 pl-4 pr-16'>
            <Logo />
            <nav className='w-2/3'>
                <div className='flex justify-between'> 
                    <PageLinks />
                </div>
            </nav>
        </div>
    );
};

export default DesktopNav;

