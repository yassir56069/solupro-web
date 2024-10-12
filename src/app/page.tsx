'use client'
import React, { useRef } from 'react';

import Splash from '../components/splash';
import BTCard from '~/components/bt_card';


export default function HomePage() {
  const bookingFormRef = useRef(null);

  return (
    <main>
      <Splash bookingFormRef={bookingFormRef}/>
      <BTCard ref={bookingFormRef}/>
    </main>
  );
}
