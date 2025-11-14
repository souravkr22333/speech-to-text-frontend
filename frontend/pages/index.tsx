import { useState, useEffect } from 'react';

import Landing from './landing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Dashboard from './dashboard';

export default function Home() {
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // If not logged in, show landing page content
  if (!isLoggedIn) {
    return (
      <>
       
      <Landing />
      
      </>
      
    );
  }

  return (
    <>

 <Dashboard />
 
   </>
  );
}
