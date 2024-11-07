import { useState } from 'react';


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

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pickupLocation: '',
    returnLocation: '',
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    // Helper Components
    const LocationInput = ({ label, name, value, onChange, placeholder }:any) => (
        <div className='flex flex-col justify-center'>
          <label aria-label={name} className='font-normal text-3xl'>{label}</label>
          <TextField>
            <Input 
              className='bg-even-darker flex flex-grow p-3 w-full rounded-md' 
              type="text" 
              name={name} 
              placeholder={placeholder}
              aria-label={name}
              value={value} 
              onChange={onChange}
              required
            />
          </TextField>
        </div>
      );


  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit} className="space-y-4">
        <TextField>
        
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-1 ml-2"
          />
        </TextField>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-1 ml-2"
          />
        </div>

        <div className='flex flex-col w-full gap-2 space-y-7 pb-7 pr-8'>
            <LocationInput 
              label="Pick up"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter pickup location"
            />
            <LocationInput 
              label="Return"

              name="returnLocation"
              value={formData.returnLocation}
              onChange={handleChange}
              placeholder="Enter return location"
            />
        </div>
        
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default SimpleForm;