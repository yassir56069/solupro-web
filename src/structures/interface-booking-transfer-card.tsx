'use client'

import BookignTransferTablist             from './components/booking-transfer-card/tablist';

import  { useFormState, useFormStatus }   from 'react-dom';
import  { useState, useEffect }           from 'react';
import  React, { forwardRef }             from 'react';
import  handleSubmit                      from './components/util/check-submit';
// import  { useCheckWrap }                  from '../util/check_flexwrap';
import  { RangeCalendar, CalendarCell,
  CalendarGrid,
  Heading, 
  Button,
  TextField,
  Label,
  Input,
  Form,
  Tabs,
  TabList,
  Tab,
    TabPanel,
}                                         from 'react-aria-components';



const CARD_IMAGE = 'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';

const initialState = {
  email: '',
  phone: '',
  pickupLocation: '',
  pickupDate: '',
  returnLocation: '',
  returnDate: '',
  carType: '',
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}


const  BookingTransferFormCard = forwardRef<HTMLDivElement, any>((props, ref) => {

  const [formState, setFormState]     = useState(initialState);
  const { email, phone, pickupLocation, pickupDate, returnLocation, returnDate, carType } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
 * Renders the ClientDetailsPanel component for capturing client information.
 * This panel is displayed on the left side on larger screens and moves to the top on mobile screens.
 * It collects essential client details, such as email and phone number, and includes a visual card image.
 *
 * @component
 * @returns {JSX.Element} The rendered ClientDetailsPanel component with email and phone input fields and a client card image.
 *
 * @example
 * <ClientDetailsPanel />
 */
  function ClientDetailsPanel() {
    return ( 
      <div className='md:flex flex-col md:mt-0 pb-3 w-full md:w-auto'>
      <div className='flex flex-grow  items-center justify-center pr-1 p-3'>
        <img className={`mix-blend-hard-light z-0 hidden md:block`} src={CARD_IMAGE} />
      </div>
      
      <div className='flex flex-col gap-2 pl-2 w-full justify-center md:w-auto mt-auto mr-1'>
              <TextField>
                <Input className={'rounded-md h-10 md:h-8  md:min-w-80 min-w-[95%] p-2 bg-even-darker md:bg-white'}
                type='email' name='email' placeholder='Email Address' value={email} onChange={handleChange} required/>
              </TextField>

              <TextField>
                <Input className={'rounded-md h-10 md:h-8 md:min-w-80 min-w-[95%] p-2 bg-even-darker md:bg-white '}
                type='tel' name='phone' placeholder='Phone Number' value={phone} onChange={handleChange} required/>
              </TextField>
              
              <span className='text-3xl text-white font-normal flex justify-center md:justify-normal '> <h2>Client Details</h2> </span>
      </div>
      </div>
    );
  }

  /**
 * Renders the BookingPanel component for capturing booking details.
 * This panel includes fields for pickup and return locations as well as a date range selector.
 *
 * @component
 * @returns {JSX.Element} The rendered BookingPanel component with fields for pickup location, return location, and booking dates.
 *
 * @example
 * <BookingPanel />
 */
  function BookingPanel() {
    return (  
      <TabPanel className='flex flex-col flex-wrap ' id='booking'>
      {/* Booking details */}
      <div className='flex flex-col md:flex-row pt-4'>
        {/* pick up and return date */}
        <div className='flex flex-col w-full  gap-2  space-y-7 pb-7 pr-8'>
          {/* pickup */}
          <div className='flex flex-col justify-center'>
            <label htmlFor="pickupLocation" className='font-normal text-3xl'>Pick up</label>
            <TextField>
            <Input className='bg-even-darker flex flex-grow  p-3 w-full rounded-md' type="text" name="pickupLocation" placeholder="Enter pickup location" value={pickupLocation} onChange={handleChange}required/>
            </TextField>
          </div>
          {/* return */}
          <div>
            <label htmlFor="returnLocation" className='font-normal text-3xl'>Return</label>
            <TextField>
            <Input className='bg-even-darker flex flex-grow p-3 w-full min-w-[300px] rounded-md' type="text" name="returnLocation" placeholder="Enter return location" value={returnLocation} onChange={handleChange}required/>
            </TextField>
          </div>
        </div>

        {/* date */}
        <div className=' flex flex-row w-full md:justify-end md:items-center '>
          <div className='w-fit'>
            <h1 className='font-normal text-3xl'> Dates </h1>
            <RangeCalendar aria-label="bookingtransfer dates" className='bg-even-darker md:bg-darker rounded-md'>
                <header className='flex items-center p-4 rounded-t-md bg-darker mb-3'>
                  <Button slot="previous" className='w-8 h-8' >◀</Button> 
                  <Heading className='flex-1 text-center text-xl m-0' />
                  <Button slot="next" className='w-8 h-8 '>▶</Button>
                </header>
                <CalendarGrid className='border-spacing-0 p-10 m-0'> 
                  {(date) => (
                    <CalendarCell 
                      date={date} 
                      className='
                        w-[2.5rem] leading-[2.5rem]
                        md:w-[3rem] md:leading-[3rem]
                        text-center 
                        rounded-md  
                        // outline-none 
                        p-0
                        data-[pressed]:bg-tone-acc-orange
                        data-[selected]:bg-main-acc-orange
                        data-[selected]: m-[-1px]
                        data-[selected]:text-white 
                        data-[selected]:rounded-none 
                        data-[outside-month]:hidden 
                        data-[selection-start]:rounded-l-md 
                        data-[selection-end]:rounded-r-md
                      ' 
                    />
                  )}
                </CalendarGrid>
              </RangeCalendar>
          </div>

        </div>

      </div>
      
      {/* car types */}
      <div>
      <label htmlFor="carTypes" className='font-normal text-3xl'>Car Types</label>
        <div className="car-types">
            {/* Add car type carousel here */}
        </div>
      </div>
      </TabPanel>

    );
  }

  /**
 * Renders the TransferPanel component for capturing transfer details.
 * This component includes additional transfer information and fields.
 *
 * @component
 * @returns {JSX.Element} The rendered TransferPanel component for detailed transfer input.
 *
 * @example
 * <TransferPanel />
 */
  function TransferPanel() {
    return (  
      <TabPanel className='flex flex-col flex-wrap ' id='transfer'>
      {/* Booking details */}
      <div className='flex flex-col md:flex-row pt-4'>
        {/* pick up and return date */}
        <div className='flex flex-col  w-full  gap-2 space-y-7 pb-7 pr-8'>
          {/* pickup */}
          <div>
            <label htmlFor="pickupLocation" className='font-normal text-3xl'>Pick up</label>
            <TextField>
            <Input className='bg-even-darker flex flex-grow p-3 w-full rounded-md' type="text" name="pickupLocation" placeholder="Enter pickup location" value={pickupLocation} onChange={handleChange}required/>
            </TextField>
          </div>
          {/* return */}
          <div>
            <label htmlFor="returnLocation" className='font-normal text-3xl'>Return</label>
            <TextField>
            <Input className='bg-even-darker flex flex-grow p-3 w-full min-w-[300px] rounded-md' type="text" name="returnLocation" placeholder="Enter return location" value={returnLocation} onChange={handleChange}required/>
            </TextField>
          </div>
        </div>

        {/* date */}
        <div className=' flex flex-row w-full md:justify-end md:items-center '>
          <div className='w-fit'>
            <h1 className='font-normal text-3xl'> Dates </h1>
            <RangeCalendar aria-label="bookingtransfer dates" className='bg-even-darker md:bg-darker rounded-md'>
                <header className='flex items-center p-4 rounded-t-md bg-darker mb-3'>
                  <Button slot="previous" className='w-8 h-8' >◀</Button> 
                  <Heading className='flex-1 text-center text-xl m-0' />
                  <Button slot="next" className='w-8 h-8 '>▶</Button>
                </header>
                <CalendarGrid className='border-spacing-0 p-10 m-0'> 
                  {(date) => (
                    <CalendarCell 
                      date={date} 
                      className='
                        w-[2.5rem] leading-[2.5rem]
                        md:w-[3rem] md:leading-[3rem]
                        text-center 
                        rounded-md  
                        // outline-none 
                        p-0
                        data-[pressed]:bg-tone-acc-orange
                        data-[selected]:bg-main-acc-orange
                        data-[selected]: m-[-1px]
                        data-[selected]:text-white 
                        data-[selected]:rounded-none 
                        data-[outside-month]:hidden 
                        data-[selection-start]:rounded-l-md 
                        data-[selection-end]:rounded-r-md
                      ' 
                    />
                  )}
                </CalendarGrid>
              </RangeCalendar>
          </div>

        </div>

      </div>
      
      {/* car types */}
      <div>
      <label htmlFor="carTypes" className='font-normal text-3xl'>Car Types</label>
        <div className="car-types">
            {/* Add car type carousel here */}
        </div>
      </div>
      </TabPanel>

    );
  }

  /**
 * Renders the SubmitWrapper component containing a styled submit button.
 * Positioned at the bottom right of the container on larger screens.
 *
 * @component
 * @returns {JSX.Element} The rendered SubmitWrapper component with a stylized submit button.
 *
 * @example
 * <SubmitWrapper />
 */
  function SubmitWrapper()
  {
    return (
      <div className='md:absolute md:bottom-0 md:right-0 m-4'> 
        <div className={` 
          flex justify-center 
          mt-14
          p-2 pr-8 pl-8 text-white text-xl rounded-full transition-all duration-500 bg-gradient-to-tl from-main-acc-orange via-tone-acc-orange to-lite-tone-acc-orange bg-size-200 bg-pos-0 hover:bg-pos-100
          `}>
            <SubmitButton/>
          </div>
      </div>
    ) 
  }
  
  /**
 * Renders the BookingTransferDetails component, a container for multiple panels.
 * This component wraps ClientDetailsPanel, BookingPanel, TransferPanel, and SubmitWrapper in the correct sequence,
 * with necessary styling and positioning adjustments.
 *
 * @component
 * @returns {JSX.Element} The rendered BookingTransferDetails component with client, booking, and transfer details and a submit button.
 *
 * @example
 * <BookingTransferDetails />
 */
  function BookingTransferDetails() {
    return (  
      <div className='flex-grow max-w-[100vw]
      md:bg-white  bg-transparent rounded-s-xl rounded-md p-4 md:relative'>
        <Tabs className=''>
          <BookignTransferTablist/>
          <BookingPanel/>
          <TransferPanel/>
        </Tabs>
        <SubmitWrapper/>
      </div>
    );
  }
  

  return (
    <section ref={ref} className='font-creatoDisplay font-light text-sm text-white md:text-blck flex justify-center items-center h-screen z-0'>
        <Form 
          onSubmit={handleSubmit}
          className={`
            flex flex-row
            flex-wrap       md:flex-nowrap
            w-full          md:w-5/6
            rounded-none    md:rounded-md
            shadow-none     md:shadow-lg
            lg:h-[40rem]    lg:max-h-[80%] 
            xl:h-[60rem]    xl:max-h-2/3
            bg-transparent  md:bg-main-acc-blue
            
        `}>            
          <ClientDetailsPanel/>
          
          <BookingTransferDetails/>
        
        </Form> 
    </section>
  );
});

export default BookingTransferFormCard;
