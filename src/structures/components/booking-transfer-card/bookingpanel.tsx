
import  { RangeCalendar, CalendarCell,
    CalendarGrid,
    Heading, 
    Button,
    TextField,
    Input,
    TabPanel,
    FieldError,
}                                         from 'react-aria-components';

import React                              from 'react';
import { useDateFormatter }               from 'react-aria';
import { getLocalTimeZone, today }        from '@internationalized/date';
import { EmblaOptionsType }               from 'embla-carousel';

import CarCardsCarousel                   from './car-types-carousel';


const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDES = {
  'Suv'           : "https://utfs.io/f/wkZXy01VKbhe2HDGIObnY5r3qTu2UFgCB98w6HfEeVistydp",
  'Small Car'     : "https://utfs.io/f/wkZXy01VKbhe446K2RHBs5vSNfT3MlwxuyZcOX8aYWrUpdDR",
  'Sedan'         : "https://utfs.io/f/wkZXy01VKbheFc1Bqc41N5WxYy3ZcJLnlmviMaVBw0tHXTUI",
  'Pick-up Truck' : "https://utfs.io/f/wkZXy01VKbhePeT9GcCmvVhIkXQEfqR2SLOgn7xDNtPAKUGw",
}


const BookingTabPanel = ({ values, onChange, range, setRange, showRangeError, selectedSlide, setSelectedSlide }:any) => {
    const formatter = useDateFormatter({ dateStyle: 'long' });

    const renderDateDisplay = () => {
      if (!range?.start || !range?.end) return (
      <div className=' invisible flex flex-row text-sm justify-start'>
          <em>Reservation starts on  <span className='font-bold'> 10 december 2020 </span>, &nbsp;
          and ends on <span className='font-bold'> 10 december 2020 </span></em>
      </div>
      )
      ;
  
      return range.start.toString() === range.end.toString() ? (
        <div className='flex flex-row justify-start '>
          <em className='opacity-60 text-sm'>
            Reversation starts and ends on <span className='font-bold'> {formatter.format(range.start.toDate(getLocalTimeZone()))} </span>
          </em>
        </div>
      ) : (
        <div className='opacity-60 text-sm flex justify-start text-center md:text-left'>
            <em>Reservation starts on  <span className='font-bold'> {formatter.format(range.start.toDate(getLocalTimeZone()))} </span>, &nbsp;
            and ends on <span className='font-bold'> {formatter.format(range.end.toDate(getLocalTimeZone()))} </span></em>
        </div>
      );
    };
  
    return (
      <TabPanel className='flex flex-col flex-wrap' id='booking'>
        <p className='opacity-40 text-sm pt-1 '> With Solupro, you can book your car within a 24 hour notice via our booking card.</p>
        <div className='flex flex-col md:flex-row pt-4  items-start'>
          {/* Pick up and Return Locations */}
          <div className='flex flex-col w-full gap-2 space-y-7 pb-7 pr-8'>
            <LocationInput 
              label="Pick up"
              name="pickupLocation"
              value={values.pickupLocation}
              onChange={onChange}
              placeholder="Enter pickup location*"
            />
            <LocationInput 
              label="Return"
              name="returnLocation"
              value={values.returnLocation}
              onChange={onChange}
              placeholder="Enter return location*"
            />

          </div>



          {/* Date Selection */}
          <div className='flex flex-col w-full md:justify-end'>
            <h1 className='font-normal text-3xl'>Dates</h1>
            <div className='flex z-0 md:p-1 '>
              {renderDateDisplay()}
            </div>
            <div className='p-1 pt-6 pb-6 md:p-0'>
              <div className='flex justify-center items-center'>
                <RangeCalendar 
                  aria-label="booking transfer dates" 
                  minValue={today(getLocalTimeZone())}
                  className='bg-even-darker md:bg-darker rounded-md' 
                  value={range} 
                  onChange={setRange}
                >
                  <CalendarHeader />
                  <CalendarGrid className='[&_td]:px-0 border-collapse p-10 m-0'>
                      {(date) => (
                        <CalendarCell 
                          date={date} 
                          className={`
                            w-[10vw] leading-[2.5rem]
                            md:w-[4vw] md:min-w-[3rem] md:leading-[3rem]
                            text-center 
                            rounded-lg 
                            ml-[-1px] mr-[-1px]
                            data-[pressed]:bg-tone-acc-orange
                            data-[selected]:bg-main-acc-orange
                            data-[selected]:text-white 
                            data-[selected]:rounded-none 
                            data-[outside-month]:hidden 
                            data-[selection-start]:rounded-l-2xl
                            data-[selection-end]:rounded-r-2xl
                            data-[disabled]:text-unselected
                          `} 
                        />
                        
                      )}
                    </CalendarGrid>
                    {showRangeError && (
                      <p className="absolute text-error mt-2  text-center">
                        Please select a date range for your booking.
                      </p>
                    )}
                </RangeCalendar>
              </div>
            </div>
          </div>
        </div>
        
        {/* Car Types */}
        <div className=''>
          <label htmlFor="carTypes" className='font-normal text-3xl '>Car Types</label>
            <CarCardsCarousel selectedSlide={selectedSlide} setSelectedSlide={setSelectedSlide} slides={SLIDES}  options={OPTIONS}/>
        </div>
      </TabPanel>
    );
  };
  
  // Helper Components
  const LocationInput = ({ label, name, value, onChange, placeholder }:any) => (
    <div className='flex flex-col justify-center'>
      <label htmlFor={name} className='font-normal text-3xl'>{label}</label>
      <TextField>
        <svg
          className="relative top-11 left-3 transform -translate-y-1/2 text-unselected h-5 w-5"
          fill="currentColor"
        >
          <use href={`/icons/sprite.svg#location_on-outlined`} />
        </svg>
        <Input 
          className='bg-even-darker flex flex-grow p-3 pl-10 w-full rounded-md' 
          type="text" 
          name={name} 
          placeholder={placeholder}
          value={value} 
          onChange={onChange}
          required
        />
        <div
          role="tooltip"
        >
          <FieldError className="relative top-1 left-0 w-full text-error text-sm bg-even-darker px-2 py-1 rounded-md shadow-lg" />
        </div>
      </TextField>
    </div>
  );
  
  const CalendarHeader = () => (
    <header className='flex items-center p-4 rounded-t-md bg-darker mb-3'>
      <Button slot="previous" className='w-8 h-8'>◀</Button> 
      <Heading className='flex-1 text-center text-xl m-0' />
      <Button slot="next" className='w-8 h-8'>▶</Button>
    </header>
  );
  
  // const CustomCalendarGrid = () => (
  //   <CalendarGrid className='[&_td]:px-0 border-collapse p-10 m-0'>
  //     {(date) => (
  //       <CalendarCell 
  //         date={date} 
  //         className={`
  //           w-[10vw] leading-[2.5rem]
  //           md:w-[4vw] md:min-w-[3rem] md:leading-[3rem]
  //           text-center 
  //           rounded-lg 
  //           ml-[-1px] mr-[-1px]
  //           data-[pressed]:bg-tone-acc-orange
  //           data-[selected]:bg-main-acc-orange
  //           data-[selected]:text-white 
  //           data-[selected]:rounded-none 
  //           data-[outside-month]:hidden 
  //           data-[selection-start]:rounded-l-2xl
  //           data-[selection-end]:rounded-r-2xl
  //         `} 
  //       />
        
  //     )}
  //   </CalendarGrid>
  // );
  
  export default BookingTabPanel;