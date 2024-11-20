'use client'

import BookignTransferTablist             from './components/booking-transfer-card/tablist';
import BookingTabPanel                    from './components/booking-transfer-card/bookingpanel';
import TransferTabPanel                   from './components/booking-transfer-card/transferpanel';    
// import handleSubmit                       from './components/util/logic-handle-submit';   

import  { useFormState, useFormStatus }   from 'react-dom';
import  { useState, useEffect }           from 'react';
import  React, { forwardRef }             from 'react';

// import  { useCheckWrap }                  from '../util/check_flexwrap';
import  {
  TextField,
  Input,
  Form,
  Tabs,
  FieldError,
}                                         from 'react-aria-components';
import type {DateRange}                   from 'react-aria-components';

import { useDateFormatter }               from 'react-aria';
import { parseAbsoluteToLocal, parseZonedDateTime}           from '@internationalized/date';

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
    numberPassengers: 1,
    numberBaggage   : 0,
    message         : null,
  });

  const [selectedSlide, setSelectedSlide] = useState<number | null>(null) // Track selected slide
  const [flightArrivalTime, setFlightArrivalTime] = useState(parseZonedDateTime('2022-11-07T00:00[Indian/Mauritius]'));
  let   [date, setDate] = React.useState(parseAbsoluteToLocal('2021-04-07T18:45:22Z'));  
  let   [range, setRange] = React.useState<DateRange | null>(null);
  const [showRangeError, setShowRangeError] = useState(false);



  const { pending } = useFormStatus();

  const handleDateChange = (newRange:any) => {
    setRange(newRange);
    if (newRange) setShowRangeError(false);
    console.log("Updated Range:", newRange); // Log updated range immediately
  };

  const handleTimeChange = (newTime: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      flightArrivalTime: newTime, // Update the flightArrivalTime field in formData
    }));
  };


  const handleNumberBaggageChange = (newValue: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberBaggage: newValue, // Update the numberBaggage field
    }));
  };

  
  const handleNumberPassengerChange = (newValue: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberPassengers: newValue, // Update the numberBaggage field
    }));
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
          p-2 pr-8 pl-8 text-white text-xl rounded-full transition-all duration-500 bg-gradient-to-tl from-main-acc-orange via-tone-acc-orange to-lite-tone-acc-orange bg-size-200 bg-pos-0 hover:bg-pos-100 md:active:bg-pos-0
          `}>
            <SubmitButton/>
          </div>
      </div>
    ) 
  }

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!range?.start || !range?.end) {
      setShowRangeError(true); // Show error if no date range is selected
      console.log('no range')

    } else {
      console.log('Form submitted:', formData);
      console.log("Submitted Date Range:", range);
      console.log('selected slide', selectedSlide);
      console.log('Flight Arrival Time:', flightArrivalTime.toString());
    }
  };

  return (
    <section ref={ref} className='font-creatoDisplay font-normal mb-6 text-white md:text-blck flex justify-center items-center '>
        <Form 
          onSubmit={handleSubmit} 
          className={`
            flex flex-row
            flex-wrap       md:flex-nowrap
            w-full          md:w-5/6
            rounded-none    md:rounded-md
            shadow-none     md:shadow-lg
            lg:h-[51rem]
            xl:h-[52rem]  
            bg-transparent  md:bg-main-acc-blue
            m-0
        `}>            
          <div className='md:flex flex-col md:mt-0 pb-3 w-full md:w-auto'>
          <div className='flex flex-grow  items-center justify-center pr-1 p-3'>
            <img aria-label='image' className={`mix-blend-hard-light z-0 hidden md:block`} src={CARD_IMAGE} />
          </div>
          
          <div className='flex flex-col gap-2 pl-2 w-full justify-center md:w-auto mt-auto mr-1'>
                  <TextField className="relative">
                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-unselected h-5 w-5"
                        fill="currentColor"
                      >
                        <use href={`/icons/sprite.svg#email-filled`} />
                      </svg>
                      <Input
                        className="rounded-md h-10 md:h-8 md:min-w-80 min-w-[95%] p-2 pl-10 bg-white"
                        type="email"
                        name="customerEmail"
                        aria-label="Email Address"
                        placeholder="Email Address*"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <FieldError className="-top-14 left-0 w-fit text-error font-thin text-xs bg-error-box px-2 py-1 rounded-md shadow-lg" />
                  </div>
                  </TextField>
                  <TextField className='relative'>
                    <div className='relative'>
                        <svg
                          className="relative top-9 left-3 transform -translate-y-1/2 text-unselected h-5 w-5"
                          fill="currentColor"
                        >
                          <use href={`/icons/sprite.svg#local_phone-filled`} />
                        </svg>
                      <Input
                        className="rounded-md h-10 md:h-8 md:min-w-80 min-w-[95%] p-2 pl-10 bg-white"
                        type='tel'
                        name='customerTel'
                        aria-label="Telephone Number"
                        placeholder='Phone Number*'
                        value={formData.customerTel}
                        onChange={handleChange}
                        required
                      />
                      <div role="tooltip">
                        <FieldError className="-top-14 left-0 w-full text-error font-thin text-xs bg-error-box px-2 py-1 rounded-md shadow-lg"> 
                        {({validationDetails}) => (
                            validationDetails.valueMissing ? 'Please enter a phone number.' : ''
                        )}
                        </FieldError>
                      </div>
                    </div>
                  </TextField>                
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
                onChange          = {handleChange}
                range             = {range}
                setRange          = {handleDateChange} 
                showRangeError    = {showRangeError}
                selectedSlide     = {selectedSlide}     //booking only
                setSelectedSlide  = {setSelectedSlide}  //booking only
                
              />
              <TransferTabPanel
                values={{
                  pickupLocation    : formData.pickupLocation,
                  returnLocation    : formData.returnLocation,
                  numberBaggage     : formData.numberBaggage,
                  numberPassengers  : formData.numberPassengers,
                }}
                onChange                    =  {handleChange}
                range                       = {range}
                setRange                    = {handleDateChange} 
                showRangeError              = {showRangeError}
                handleNumberBaggageChange   = {handleNumberBaggageChange}     //transfer only
                handleNumberPassengerChange = {handleNumberPassengerChange}   //transfer only
                flightArrivalTime           = {flightArrivalTime}             //transfer only
                setFlightArrivalTime        = {setFlightArrivalTime}          //transfer only
                handhandleTimeChange        = {handleTimeChange}              //transfer only
              />
            </Tabs>
            <SubmitWrapper/>
          </div>

        </Form> 
    </section>
  );
});

export default BookingTransferFormCard;
