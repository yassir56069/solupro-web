import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import React from 'react';

import {
  parseAbsoluteToLocal,
  parseZonedDateTime,
} from '@internationalized/date';
import type { DateRange } from 'react-aria-components';

import { Toaster, toast } from 'sonner';
import { useDateFormatter } from 'react-aria';

import { sendEmail, type SendEmailResult } from '~/lib/resend';

export const CARD_IMAGE =
    'https://utfs.io/f/wkZXy01VKbheFXbc93z41N5WxYy3ZcJLnlmviMaVBw0tHXTU';

// SubmitButton Component
export function SubmitButton({ isSubmitting = false }: { isSubmitting?: boolean }) {
  const { pending } = useFormStatus();
  const isLoading = isSubmitting || pending;

  return (
      <>
        <Toaster richColors />
        <button
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading && (
              <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
          )}
          <span>{isLoading ? 'Sending...' : 'Submit'}</span>
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
  const [flightArrivalTime, setFlightArrivalTime] = useState(
      parseZonedDateTime('2022-11-07T00:00[Indian/Mauritius]')
  );
  const [date, setDate] = useState(parseAbsoluteToLocal('2021-04-07T18:45:22Z'));
  const [range, setRange] = useState<DateRange | null>(null);
  const [showRangeError, setShowRangeError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendStatus, setSendStatus] = useState<SendEmailResult | null>(null);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!range?.start || !range?.end) {
      setShowRangeError(true);
      console.log('No range');
      return;
    }

    setIsSubmitting(true);
    setSendStatus(null);

    try {
      const isBooking = formData.pickupLocation.trim().length > 0;
      const emailTitle = `Customer ${formData.customerEmail} Tel: ${formData.customerTel} ${
          isBooking ? `Booking Starting ${range?.start}` : `Transfer Starting ${range?.start}`
      }`;

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
        <p><strong>Reservation Type:</strong> ${isBooking ? 'Booking' : 'Transfer'}</p>
        <p><strong>Reservation Dates:</strong> ${range?.start} to ${range?.end}</p>
        ${
          isBooking
              ? `
          <h3 style="color: #035360;">Booking Details</h3>
          <p><strong>Pickup Location:</strong> ${formData.pickupLocation}</p>
          <p><strong>Return Location:</strong> ${formData.returnLocation}</p>
          <p><strong>Car Type:</strong> 
            ${
                  selectedSlide === null || selectedSlide === 0
                      ? 'SUV'
                      : selectedSlide === 1
                          ? 'Economy Car'
                          : 'Pick-Up Truck'
              }
          </p>
        `
              : `
          <h3 style="color: #EE9236;">Transfer Details</h3>
          <p><strong>Return Location:</strong> ${formData.returnLocation}</p>
          <p><strong>Number of Passengers:</strong> ${formData.numberPassengers}</p>
          <p><strong>Number of Baggage:</strong> ${formData.numberBaggage}</p>
          <p><strong>Flight Arrival Time:</strong> ${flightArrivalTime}</p>
        `
      }
      </div>
      `;

      const result = await sendEmail(emailTitle, emailBody);

      if (!result) {
        toast.error('Server returned no response (504 timeout)', {
          description: 'Check Vercel Function Logs for details.',
          duration: 10000,
        });
        return;
      }

      setSendStatus(result);

      if (result.success) {
        toast.success('Booking request sent!', {
          description: `To: ${result.to} (${result.source})${result.redisNote ? ` | Redis: ${result.redisNote}` : ''} | ID: ${result.id ?? 'N/A'}`,
          duration: 10000,
        });
        console.log('Email sent debug:', result);
      } else {
        toast.error('Failed to send booking email', {
          description: `Target: ${result.to} (${result.source}) | Error: ${result.error}`,
          duration: 10000,
        });
        console.error('Email failed debug:', result);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unexpected client error';
      toast.error('Something went wrong submitting the form', {
        description: msg,
        duration: 10000,
      });
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
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
    isSubmitting,
    sendStatus,
    handleDateChange,
    handleTimeChange,
    handleNumberBaggageChange,
    handleNumberPassengerChange,
    handleChange,
    handleSubmit,
  };
};