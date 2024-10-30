'use client'

import  { useFormState, useFormStatus }   from 'react-dom';
import  { useState, useEffect }           from 'react';
import  React, { forwardRef }             from 'react';
import  handleSubmit                      from '../elements/submit_logic';
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


const card_image = 'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';

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

function useResizeObserver(ref: React.RefObject<HTMLElement>) {
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let initialWidth = element.offsetWidth;
    let initialHeight = element.offsetHeight;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target instanceof HTMLElement) {
          const currentWidth = entry.target.offsetWidth;
          const currentHeight = entry.target.offsetHeight;

          // Check for significant changes in width and height to determine wrap
          const widthDecreased = currentWidth < initialWidth - 10; // Set threshold, e.g., 10px
          const heightIncreased = currentHeight > initialHeight + 5; // Height threshold, e.g., 5px

          setIsWrapped(widthDecreased && heightIncreased);
        }
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return isWrapped;
}



const  BookingTransferFormCard = forwardRef<HTMLDivElement, any>((props, ref) => {
 const isWrapped = useResizeObserver(ref as React.RefObject<HTMLDivElement>);

  const [formState, setFormState]     = useState(initialState);
  const { email, phone, pickupLocation, pickupDate, returnLocation, returnDate, carType } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };



  return (
    <div ref={ref} className='font-creatoDisplay font-light text-sm text-white md:text-blck flex justify-center items-center h-screen z-0'>

        {/* this is the element that needs the wrap functionality */}
        <Form 
          onSubmit={handleSubmit}
          className={`
            flex 
            flex-row 
            md:flex-nowrap
            flex-wrap 
            rounded-md 
            w-5/6 
            min-h-fit 
            lg:h-[40rem]
            lg:max-h-[80%] 
            xl:h-[60rem]
            xl:max-h-2/3
            md:bg-main-acc-blue
            bg-transparent  md:shadow-lg 
            `}
        >
            
          {/* client details */}
            <div className='md:flex flex-col justify-between pb-3 w-full md:w-auto'>
              
                <div className='flex flex-grow  items-center justify-center pr-1 p-3'>
                  <img className={`mix-blend-hard-light z-0 hidden md:block`} src={card_image} />
                </div>
                
                <section className='flex flex-col gap-2 pl-2 w-full md:w-auto mt-auto mr-1'>
                        <TextField>
                          <Input className={'rounded-md h-10 md:h-8  md:min-w-80 min-w-[80%] p-2 bg-even-darker md:bg-white'}
                          type='email' name='email' placeholder='Email Address' value={email} onChange={handleChange} required/>
                        </TextField>

                        <TextField>
                          <Input className={'rounded-md h-10 md:h-8 md:min-w-80 min-w-[80%] p-2 bg-even-darker md:bg-white '}
                          type='tel' name='phone' placeholder='Phone Number' value={phone} onChange={handleChange} required/>
                        </TextField>
                        
                        <span className='text-3xl text-white font-normal'> <h2>Client Details</h2> </span>
                </section>
            </div>

          {/* booking transfer */}
            <div className='flex-grow md:bg-white bg-transparent rounded-s-xl rounded-md p-4'>
                <Tabs className=''>
                      <TabList className='flex flex-row  font-normal text-4xl'>
                          <Tab id='booking' > Booking   </Tab>
                          <Tab id='transfer'> Transfer  </Tab>
                      </TabList>

                    <TabPanel className='flex flex-col flex-wrap' id='booking'>
                        {/* pick up and return  */}
                      <div className='flex flex-row'>

                        {/* pickup & Return */}
                        <div className='flex flex-col gap-2 space-y-7 pb-7 pr-4'>
                          <div>
                            <label htmlFor="pickupLocation" className='font-normal text-3xl'>Pick up</label>
                            <TextField>
                            <Input className='bg-darker p-3 rounded-md' type="text" name="pickupLocation" placeholder="Enter pickup location" value={pickupLocation} onChange={handleChange}required/>
                            </TextField>
                          </div>
                          <div>
                            <label htmlFor="returnLocation" className='font-normal text-3xl'>Return</label>
                            <TextField>
                            <Input className='bg-darker p-3 rounded-md' type="text" name="returnLocation" placeholder="Enter return location" value={returnLocation} onChange={handleChange}required/>
                            </TextField>
                          </div>
                        </div>

                        {/* date */}
                        <div className=' flex flex-row w-full items-center justify-center '>
                          <div className='w-fit'>
                            <h1 className='font-normal text-xl'> Dates </h1>
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
                        <h3>Car Types</h3>
                        <div className="car-types">
                            {/* Add car type inputs here */}
                        </div>
                      </div>
                      
                      <div>
                        <SubmitButton/>
                      </div>
                    </TabPanel>

                    <TabPanel id='transfer'> <div> <h1> test</h1> </div></TabPanel>
                </Tabs>
            </div>
        </Form>
    </div>

  );
});

export default BookingTransferFormCard;
