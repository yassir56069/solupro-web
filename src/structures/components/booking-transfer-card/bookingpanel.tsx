
import  { useState, useEffect }           from 'react';
import  React, { forwardRef }             from 'react';

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

import type {DateRange} from 'react-aria-components';

const BookingTabPanel = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    let [range, setRange] = React.useState<DateRange | null>(null);
  
    const handleChange = (e:any) => {
      const { name, value } = e.target;
      name === 'pickupLocation' 
        ? setPickupLocation(value) 
        : setReturnLocation(value);
    };
  
    const renderDateDisplay = () => {
      if (!range?.start || !range?.end) return null;
  
      return range.start.toString() === range.end.toString() ? (
        <div className='flex flex-row gap-9 justify-evenly'>
          <span className='opacity-75 text-xs'>
            Start & End Date: {range.start.toString()}
          </span>
        </div>
      ) : (
        <div className='flex flex-row gap-9 justify-evenly'>
          <span>
            <p>Start Date: {range.start.toString()}</p>
            <p>End Date: {range.end.toString()}</p>
          </span>
        </div>
      );
    };
  
    return (
      <TabPanel className='flex flex-col flex-wrap' id='booking'>
        <div className='flex flex-col md:flex-row pt-4'>
          {/* Pick up and Return Locations */}
          <div className='flex flex-col w-full gap-2 space-y-7 pb-7 pr-8'>
            <LocationInput 
              label="Pick up"
              name="pickupLocation"
              value={pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup location"
            />
            <LocationInput 
              label="Return"
              name="returnLocation"
              value={returnLocation}
              onChange={handleChange}
              placeholder="Enter return location"
            />
            
            <div className='block md:hidden'>
              {renderDateDisplay()}
            </div>
          </div>
  
          {/* Date Selection */}
          <div className='flex flex-col w-full md:justify-end'>
            <h1 className='font-normal text-3xl'>Dates</h1>
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
        <div>
          <label htmlFor="carTypes" className='font-normal text-3xl'>Car Types</label>
          <div className="car-types">
            {/* Placeholder for car type carousel */}
          </div>
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
            w-[12vw] leading-[2.5rem]
            md:w-[4vw] md:min-w-[3rem] md:leading-[3rem]
            text-center 
            rounded-md  
            p-0
            data-[pressed]:bg-tone-acc-orange
            data-[selected]:bg-main-acc-orange
            data-[selected]:text-white 
            data-[selected]:rounded-none 
            data-[outside-month]:hidden 
            data-[selection-start]:rounded-l-md 
            data-[selection-end]:rounded-r-md
          `} 
        />
      )}
    </CalendarGrid>
  );
  
  export default BookingTabPanel;