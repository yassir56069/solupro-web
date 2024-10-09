'use client'

import { useFormState, useFormStatus } from 'react-dom';
import {TextField, Label, Input} from 'react-aria-components';
import { useState } from 'react';

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

function BTFormCard() {
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
    <div className='font-creatoDisplay font-light text-sm flex justify-center items-center'>

        <form onSubmit={handleSubmit} className="flex flex-row gap-6 bg-white shadow-lg   w-2/3">
            
            <div className='bg-main-acc-blue p-8'>
                <section className="">
                    <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handleChange}
                    required
                    />

                <span className='text-2xl text-white font-normal'> <h2>Client Details</h2> </span>
                </section>
            </div>


            <div className='p-8 flex flex-col'>
                <section>
                    <nav className='flex flex-row  font-normal text-2xl'>
                        <h2>Booking</h2>
                        <span className='p-8'>   </span>
                        <h2 className="disabled">Transfer</h2>
                    </nav>
                    <div>
                    <label htmlFor="pickupLocation">Pick up</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        placeholder="Enter pickup location"
                        value={pickupLocation}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="datetime-local"
                        name="pickupDate"
                        value={pickupDate}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="returnLocation">Return</label>
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

                    <div>
                    <h3>Car Types</h3>
                    <div className="car-types">
                        {/* Add car type inputs here */}
                    </div>
                    </div>
                    
                    <SubmitButton />
                </section>
            </div>


        </form>
    </div>

  );
}

export default BTFormCard;
