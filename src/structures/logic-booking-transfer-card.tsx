import  { useFormStatus }   from 'react-dom';
import  { useState }        from 'react';
import  React               from 'react';

import { 
    parseAbsoluteToLocal, 
    parseZonedDateTime
}                           from '@internationalized/date';
import type { DateRange }   from 'react-aria-components';

import { useDateFormatter } from 'react-aria';

import { sendEmail }        from '~/lib/resend';

import { Redis }            from "@upstash/redis";
import { Ratelimit }        from "@upstash/ratelimit";

import { Toaster, toast }   from 'sonner'

export const CARD_IMAGE = 'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';



// SubmitButton Component
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
    <Toaster richColors/>
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
    </>
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

  const redis = Redis.fromEnv()
  

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "180 s"), // 5 requests per 3 minutes
    timeout: 300, // Block for 5 minutes after limit exceeded
  });
  


  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const userIp = e.target.ip || "unknown-ip"; // Use user's IP or a unique identifier for rate-limiting
    const { success, reset, remaining } = await ratelimit.limit(userIp);
  
    if (!success) {
      toast.error(
        `Rate limit exceeded. Please wait a few minutes and try again.`
      );
      return;
    }
  
    const isBooking = !!formData.pickupLocation;
    console.log("KV_REST_API_URL:", process.env.KV_REST_API_URL);
    const emailTitle = `Customer ${formData.customerEmail} Tel: ${formData.customerTel} ${isBooking ? `Booking Starting ${range?.start}` : `Transfer Starting ${range?.start}`}`

    const emailBody = `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 5px;">
      <div style="
          display: flex;
          width: 100%;
          background: rgb(2,0,36);
          background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(11,148,121,1) 100%, rgba(0,212,255,1) 100%); 
          border-radius:6px;
      "> 
              <h2 style="color: #ffffff; padding: 4px;">Reservation Details</h2>
      </div>
      <p><strong>Customer Email:</strong> ${formData.customerEmail}</p>
      <p><strong>Customer Phone:</strong> ${formData.customerTel}</p>
      <p><strong>Reservation Type:</strong> ${isBooking ? "Booking" : "Transfer"}</p>
      <p><strong>Reservation Dates:</strong> ${range?.start} to ${range?.end}</p>
      ${isBooking ? `
        <h3 style="color: #035360;">Booking Details</h3>
        <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
        <p><strong>Return Location:</strong> ${formData.returnLocation}</p>
        <p><strong>Car Type:</strong> 
          ${selectedSlide === null || selectedSlide === 0 
            ? 'SUV' 
            : selectedSlide === 1 
              ? 'Economy Car' 
              : 'Pick-Up Truck'}
        </p>
      ` : `
        <h3 style="color: #EE9236;">Transfer Details</h3>
        <p><strong>Return Location:</strong> ${formData.returnLocation}</p>
        <p><strong>Number of Passengers:</strong> ${formData.numberPassengers}</p>
        <p><strong>Number of Baggage:</strong> ${formData.numberBaggage}</p>
        <p><strong>Flight Arrival Time:</strong> ${flightArrivalTime}</p>
      `}
    </div>
    `;
  
    if (!range?.start || !range?.end) {
      setShowRangeError(true);
      console.log("No range");
      return;
    }
  
    try {
      await sendEmail(emailTitle, emailBody);
      toast.success("Email sent successfully!");
      console.log("Form submitted:", formData);
      console.log("Submitted Date Range:", range);
      console.log("Selected slide:", selectedSlide);
      console.log("Flight Arrival Time:", flightArrivalTime.toString());
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Email sending error:", error);
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


