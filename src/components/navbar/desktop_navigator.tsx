import Logo                           from '../elements/logo_instantiator'
import PageLinks                      from '../elements/page_link_instantiator';


const DesktopNav = () => {
    return (
        <div className='h-24 stick top-0 z-[20] mx-auto flex items-center justify-between w-full pb-1 pt-2 pl-4 pr-16'>
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
