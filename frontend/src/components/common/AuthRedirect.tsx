'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a stored return path from login
    const returnPath = sessionStorage.getItem('returnPath');
    
    if (returnPath) {
      // Clear the stored path
      sessionStorage.removeItem('returnPath');
      
      // Redirect to the stored path
      router.push(returnPath);
    }
  }, [router]);

  return null; // This component doesn't render anything
}
