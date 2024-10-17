'use client'
import React, { useRef }        from 'react';

import TextSplashPage           from '../components/page-content/text_splash_page';
import BookingTransferFormCard  from '~/components/page-content/booking_transfer_interface';


export default function HomePage() {
  const bookingFormRef = useRef(null);

  return (
    <main>
      <TextSplashPage           bookingFormRef={bookingFormRef}/>
      <BookingTransferFormCard  ref={bookingFormRef}/>
    </main>
  );
}
