'use client'
import React, { useRef } from 'react';

import TextSplashPage from '../components/splash_page';
import BookingTransferFormCard from '~/components/booking_transfer_interface';


export default function HomePage() {
  const bookingFormRef = useRef(null);

  return (
    <main>
      <TextSplashPage bookingFormRef={bookingFormRef}/>
      <BookingTransferFormCard ref={bookingFormRef}/>
    </main>
  );
}
