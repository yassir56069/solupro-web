import  { useFormStatus }   from 'react-dom';
import  { useState }        from 'react';
import  React               from 'react';

import { 
    parseAbsoluteToLocal, 
    parseZonedDateTime
}                           from '@internationalized/date';
import type {DateRange}     from 'react-aria-components';

import { useDateFormatter } from 'react-aria';


export const CARD_IMAGE = 'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';

// SubmitButton Component
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
}

export const useBookingTransferCardLogic = () => {
  const formatter = useDateFormatter({ dateStyle: 'long' });

  const [formData, setFormData] = useState({
    customerEmail: '',
    customerTel: '',
    pickupLocation: '',
    returnLocation: '',
    numberPassengers: 1,
    numberBaggage: 0,
    message: null,
  });

  const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
  const [flightArrivalTime, setFlightArrivalTime] = useState(parseZonedDateTime('2022-11-07T00:00[Indian/Mauritius]'));
  const [date, setDate] = useState(parseAbsoluteToLocal('2021-04-07T18:45:22Z'));
  const [range, setRange] = useState<DateRange | null>(null);
  const [showRangeError, setShowRangeError] = useState(false);

  const handleDateChange = (newRange: any) => {
    setRange(newRange);
    if (newRange) setShowRangeError(false);
    console.log('Updated Range:', newRange);
  };

  const handleTimeChange = (newTime: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      flightArrivalTime: newTime,
    }));
  };

  const handleNumberBaggageChange = (newValue: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberBaggage: newValue,
    }));
  };

  const handleNumberPassengerChange = (newValue: number) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numberPassengers: newValue,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!range?.start || !range?.end) {
      setShowRangeError(true);
      console.log('No range');
    } else {
      console.log('Form submitted:', formData);
      console.log('Submitted Date Range:', range);
      console.log('Selected slide:', selectedSlide);
      console.log('Flight Arrival Time:', flightArrivalTime.toString());
    }
  };

  return {
    formatter,
    formData,
    setFormData,
    selectedSlide,
    setSelectedSlide,
    flightArrivalTime,
    setFlightArrivalTime,
    date,
    setDate,
    range,
    setRange,
    showRangeError,
    setShowRangeError,
    handleDateChange,
    handleTimeChange,
    handleNumberBaggageChange,
    handleNumberPassengerChange,
    handleChange,
    handleSubmit,
  };
};
