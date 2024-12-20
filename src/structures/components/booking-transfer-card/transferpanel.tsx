
import  { RangeCalendar, CalendarCell,
    CalendarGrid,
    Heading, 
    Button,
    TextField,
    Input,
    TabPanel,
    FieldError,
    TimeField,
    DateInput,
    Label,
    DateSegment,
    NumberField,
    Group
}                                                                    from 'react-aria-components';

import React                                                         from 'react';
import { useDateFormatter }                                          from 'react-aria';
import { getLocalTimeZone, today, parseZonedDateTime }               from '@internationalized/date';
import { EmblaOptionsType }                                          from 'embla-carousel';


const TransferTabPanel = ({ values, onChange, range, setRange, showRangeError, flightArrivalTime, setFlightArrivalTime, handleNumberBaggageChange, handleNumberPassengerChange}:any) => {
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
      <TabPanel className='flex flex-col flex-wrap' id='transfer'>
        <p className='opacity-40 text-sm pt-1 '> Solupro provides a transfer service that picks you up from the mauritius airport</p>
        <div className='flex flex-col md:flex-row pt-4 items-start'>
          {/* Pick up and Return Locations */}
          <div className='flex flex-col w-full gap-1 space-y-7 pb-7 pr-8'>
            <div className='cursor-not-allowed'>
            <label htmlFor='pickupLocation' className='font-normal text-3xl '> Pick Up </label>
              <TextField className={'text-unselected cursor-not-allowed'} isReadOnly defaultValue={"Sir Seewoosagur Ramgoolam International Airport, Plaine Magnien, MU" }>
              <Input 
                className='bg-darker flex flex-grow p-3 w-full rounded-md cursor-not-allowed'
                type="text" 
                name='Pick Up'
              />
              </TextField>
            </div>

            <LocationInput 
              label="Return"
              name="returnLocation"
              value={values.returnLocation}
              onChange={onChange}
              placeholder="Enter return location*"
            />

            <NumberField defaultValue={0} maxValue={10} minValue={0} value={values.numberBaggage} onChange={handleNumberBaggageChange} className="bg-even-darker p-2 rounded-lg text-sm flex flex-col items-center justify-center">
              <Label className="text-sm mb-1">Number of Baggage</Label>
              <Group className="flex items-center space-x-2">
                <Button slot="decrement" className="bg-darker rounded-lg p-2 text-center">
                  -
                </Button>
                <Input className="text-center bg-darker p-2 rounded-lg" />
                <Button slot="increment" className="bg-darker rounded-lg p-2 text-center">
                  +
                </Button>
              </Group>
            </NumberField>

            <NumberField defaultValue={1} maxValue={30} minValue={1} value={values.numberPassengers} onChange={handleNumberPassengerChange} className="bg-even-darker p-2 rounded-lg text-sm flex flex-col items-center justify-center">
              <Label className="text-sm mb-1">Number of Passengers</Label>
              <Group className="flex items-center space-x-2">
                <Button slot="decrement" className="bg-darker rounded-lg p-2 text-center">
                  -
                </Button>
                <Input  className="text-center bg-darker p-2 rounded-lg" />
                <Button slot="increment" className="bg-darker rounded-lg p-2 text-center">
                  +
                </Button>
              </Group>
            </NumberField>


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
        <TimeField
          value={flightArrivalTime}
          onChange={setFlightArrivalTime}
          defaultValue={parseZonedDateTime('2022-11-07T00:00[Indian/Mauritius]')} // default value
        >
          <Label className='text-3xl '>Flight Arrival Time</Label>
          <p className='opacity-40 '> please enter the time of your flight according to the time it will land in Mauritius.</p>
          <DateInput className={'flex flex-row  md:gap-2 font-bold justify-around items-center p-2 mt-3  md:p-4 md:w-full md:text-lg md:h-[7.5rem] bg-darker md:bg-even-darker rounded-lg'}>
            {segment => 
              <DateSegment className={`p-3 md:p-7 rounded-lg md:rounded-2xl 
                ${
                  segment.type === 'hour' ? 'bg-darker text-xl' : 
                  segment.type === 'minute' ? 'bg-darker text-xl' : 
                  segment.type === 'dayPeriod' ? 'bg-darker text-sm' :
                  segment.type === 'timeZoneName' ? 'bg-darker text-sm' :
                  'p-0'
                }`} 
              segment={segment} />}
          </DateInput>
        </TimeField>
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
  
  TransferTabPanel.displayName = 'TransferTabPanel';
  export default TransferTabPanel;