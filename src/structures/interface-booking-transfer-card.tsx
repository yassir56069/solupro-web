'use client'

import BookignTransferTablist             from './components/booking-transfer-card/tablist';
import BookingTabPanel                    from './components/booking-transfer-card/bookingpanel';
import handleSubmit                       from './components/util/logic-handle-submit';   

import  { useFormState, useFormStatus }   from 'react-dom';
import  { useState, useEffect }           from 'react';
import  React, { forwardRef }             from 'react';

// import  { useCheckWrap }                  from '../util/check_flexwrap';
import  { RangeCalendar, CalendarCell,
  CalendarGrid,
  Heading, 
  Button,
  TextField,
  Input,
  Form,
  Tabs,
  TabPanel,
  
}                                         from 'react-aria-components';
import type {DateRange}                   from 'react-aria-components';

import { useDateFormatter }               from 'react-aria';

const CARD_IMAGE = 'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}


const  BookingTransferFormCard = forwardRef<HTMLDivElement, any>((props, ref) => {
  
  let formatter = useDateFormatter({ dateStyle: 'long' });

  const [formData, setFormData] = useState({
    customerEmail   : '',
    customerTel     : '',
    pickupLocation  : '',
    returnLocation  : '',
    carType         : '',
    message         : null,
  });

  const [selectedSlide, setSelectedSlide] = useState<number | null>(null) // Track selected slide
  
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  let   [range, setRange] = React.useState<DateRange | null>(null);

  const { pending } = useFormStatus();

  const handleDateChange = (newRange:any) => {
    setRange(newRange);
    console.log("Updated Range:", newRange); // Log updated range immediately
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log("Submitted Date Range:", range);
    console.log('selected slide', selectedSlide);
  };

  

  return (
    <section ref={ref} className='font-creatoDisplay font-normal  text-white md:text-blck flex justify-center items-center min-h-[60rem] md:h-screen z-0'>
        <form 
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
          <div className='md:flex flex-col md:mt-0 pb-3 w-full md:w-auto'>
          <div className='flex flex-grow  items-center justify-center pr-1 p-3'>
            <img aria-label='image' className={`mix-blend-hard-light z-0 hidden md:block`} src={CARD_IMAGE} />
          </div>
          
          <div className='flex flex-col gap-2 pl-2 w-full justify-center md:w-auto mt-auto mr-1'>
                  <div>
                  <input
                      className={'rounded-md h-10 md:h-8 md:min-w-80 min-w-[95%] p-2 bg-even-darker md:bg-white'}
                      type='email'
                      name='customerEmail'
                      aria-label="Email Address"
                      
                      placeholder='Email Address'
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                  <input
                      className={'rounded-md h-10 md:h-8 md:min-w-80 min-w-[95%] p-2 bg-even-darker md:bg-white'}
                      type='tel'
                      name='customerTel'
                      aria-label="Telephone Number"
                      placeholder='Phone Number'
                      value={formData.customerTel}
                      onChange={handleChange}
                      required
                    />
                  </div>                
                <span className='text-3xl text-white font-normal flex justify-center md:justify-normal '> <h2>Client Details</h2> </span>
          </div>
          </div>
          
        
          <div className='flex-grow max-w-[100vw]
          md:bg-white  bg-transparent rounded-s-xl rounded-md p-4 md:relative'>
            <Tabs>
              <BookignTransferTablist/>
              <BookingTabPanel
                values={{
                  pickupLocation  : formData.pickupLocation,
                  returnLocation  : formData.returnLocation,
                }}
                onChange={handleChange}
                range={range}
                setRange={handleDateChange} 
                selectedSlide={selectedSlide}
                setSelectedSlide={setSelectedSlide}
              />
            </Tabs>
            <SubmitWrapper/>
          </div>

        </form> 
    </section>
  );
});

export default BookingTransferFormCard;
