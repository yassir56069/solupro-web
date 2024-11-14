'use client'
import React, { useRef }        from 'react';

import TextSplashPage           from '../structures/interface-splash-page';
import BookingTransferFormCard  from '~/structures/interface-booking-transfer-card';
import InfoCards                from '~/structures/components/info-cards';

export default function HomePage() {
  const bookingFormRef = useRef(null);

  return (
    <main>
        <TextSplashPage           bookingFormRef={bookingFormRef}/>
      
        <BookingTransferFormCard  ref={bookingFormRef}/>
        
        <InfoCards/>

    </main>
  );
}
