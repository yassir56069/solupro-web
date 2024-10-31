
import  {TabList,Tab,}      from 'react-aria-components';

/**
 * Styling for the inner tablist component;
 * - please keep the styling for both tabs the same.
 * - you may find it beneficial to copy the style and 
 * edit them on the element directly for prototyping
 */
const tabStyling = `
    cursor-pointer
    outline-0
    pr-4
    text-transparent bg-clip-text 
    data-[selected]:from-main-acc-orange data-[selected]:to-lite-tone-acc-orange
    transition-all duration-500 bg-gradient-to-r 
    from-unselected-trans via-unselected to-white
    md:from-grey md:via-dark md:to-blck  bg-size-200 bg-pos-0 hover:bg-pos-100
`

/**
 * Tablist: 
 * - Booking & Transfer sections are made into one card, using the tablist.
 * - Entire Tablist is returned
 * @returns BookingTransferTablist
 */
function BookignTransferTablist() {
    return ( 
        <TabList className='flex flex-row justify-around p-8 md:justify-normal md:p-0 font-normal text-4xl'>
        <Tab id='booking'className={tabStyling}>Booking</Tab>
        <Tab id='transfer'className={tabStyling}>Transfer</Tab>
    </TabList>
    );
}

export default BookignTransferTablist;