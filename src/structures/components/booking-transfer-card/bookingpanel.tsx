
import  { RangeCalendar, CalendarCell,
    CalendarGrid,
    Heading, 
    Button,
    TextField,
    Input,
    TabPanel,
}                                         from 'react-aria-components';

import React, {  useState }               from 'react';
import { useDateFormatter }               from 'react-aria';
import { getLocalTimeZone }               from '@internationalized/date';
import { EmblaOptionsType }               from 'embla-carousel';
import type   { DateRange }               from 'react-aria-components';

import CarCardsCarousel                   from './car-types-carousel';


const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDES = {
  'Suv'           : "https://utfs.io/f/wkZXy01VKbheti7WMFiPMgNW67ivTkO0fdco8beXsIxwERBG",
  'Economy Car'   : "https://utfs.io/f/wkZXy01VKbhesU6V71WScdNDFOTIUVCXmPfyoLua0nlQ89rz",
  'Pick-up Truck' : "https://utfs.io/f/wkZXy01VKbhesJcfyXWScdNDFOTIUVCXmPfyoLua0nlQ89rz",
}


const BookingTabPanel = ({ values, onChange, range, setRange, selectedSlide, setSelectedSlide }:any) => {
    let formatter = useDateFormatter({ dateStyle: 'long' });



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
        <p className='opacity-40 text-sm pt-1 '> With Solupro, you can book your car within a 24 hour notice via our booking card!</p>
        <div className='flex flex-col md:flex-row pt-4'>
          {/* Pick up and Return Locations */}
          <div className='flex flex-col w-full gap-2 space-y-7 pb-7 pr-8'>
            <LocationInput 
              label="Pick up"
              name="pickupLocation"
              value={values.pickupLocation}
              onChange={onChange}
              placeholder="Enter pickup location"
            />
            <LocationInput 
              label="Return"
              name="returnLocation"
              value={values.returnLocation}
              onChange={onChange}
              placeholder="Enter return location"
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
                  className='bg-even-darker md:bg-darker rounded-md' 
                  value={range} 
                  onChange={setRange}
                >
                  <CalendarHeader />
                  <CustomCalendarGrid />
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
        <Input 
          className='bg-even-darker flex flex-grow p-3 w-full rounded-md' 
          type="text" 
          name={name} 
          placeholder={placeholder}
          value={value} 
          onChange={onChange}
          required
        />
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
  
  const CustomCalendarGrid = () => (
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
          `} 
        />
      )}
    </CalendarGrid>
  );
  
  export default BookingTabPanel;