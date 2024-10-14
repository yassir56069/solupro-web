'use client'

import { useFormState, useFormStatus } from 'react-dom';
import {TextField, Label, Input, Form} from 'react-aria-components';
import { useState } from 'react';
import React, { forwardRef } from 'react';

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

const  BookingTransferFormCard = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [formState, setFormState] = useState(initialState);
  const { email, phone, pickupLocation, pickupDate, returnLocation, returnDate, carType } = formState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //submit logic
  };

  return (
    <div ref={ref} className='font-creatoDisplay font-light text-sm flex justify-center items-center h-screen'>

        <Form onSubmit={handleSubmit} className="flex flex-row  bg-main-acc-blue shadow-lg rounded-md w-5/6 h-2/3">
            
          {/* client details */}
            <div className='flex flex-col justify-between pb-3'>
              
                <div className='flex-grow flex items-center justify-center pr-1 p-3'>
                  <img className=' mix-blend-hard-light' src={card_image} />
                </div>
                
                <section className="flex flex-col gap-2 pl-2 mt-auto">
                        <TextField>
                          <Input className={'rounded-md h-8 min-w-80 p-2'}
                          type='email' name='email' placeholder='Email Address' value={email} onChange={handleChange} required/>
                        </TextField>

                        <TextField>
                          <Input className={'rounded-md h-8 min-w-80 p-2'}
                          type='tel' name='phone' placeholder='Phone Number' value={phone} onChange={handleChange} required/>
                        </TextField>
                        
                        <span className='text-3xl text-white font-normal'> <h2>Client Details</h2> </span>
                </section>
            </div>

          {/* booking transfer */}
            <div className='flex-grow bg-white rounded-s-xl rounded-md p-4'>
                <section>
                    <nav className='flex flex-row  font-normal text-3xl'>
                        <h2>Booking</h2>
                        <span className='p-8'>   </span>
                        <h2 className="disabled">Transfer</h2>
                    </nav>

                    {/* pick up and return  */}
                    <div className='flex flex-row'>

                      {/* pickup & Return */}
                      <div className='flex flex-col gap-2 space-y-7 pb-7 pr-4'>
                        <div>
                          <label htmlFor="pickupLocation" className='font-normal text-xl'>Pick up</label>
                          <TextField>
                          <Input type="text"name="pickupLocation" placeholder="Enter pickup location" value={pickupLocation} onChange={handleChange}required/>
                          </TextField>
                        </div>
                        <div>
                          <label htmlFor="returnLocation" className='font-normal text-xl'>Return</label>
                          <TextField>
                          <Input type="text"name="returnLocation" placeholder="Enter return location" value={returnLocation} onChange={handleChange}required/>
                          </TextField>
                        </div>


                      </div>

                      {/* date */}
                      <div className='flex flex-col gap-2 pb-7'>
                        <input
                            type="text"
                            name="returnLocation"
                            placeholder="Enter return location"
                            value={returnLocation}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="datetime-local"
                            name="returnDate"
                            value={returnDate}
                            onChange={handleChange}
                            required
                        />
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
                </section>
            </div>
        </Form>
    </div>

  );
});

export default BookingTransferFormCard;
