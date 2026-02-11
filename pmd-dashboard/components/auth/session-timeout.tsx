'use client'

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/auth-actions';
import { toast } from 'sonner';

const TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export function SessionTimeout() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    toast.info("Sesión cerrada por inactividad");
    await logout();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleLogout, TIMEOUT_MS);
    };

    // Initial timer
    resetTimer();

    // Events to track activity
    const events = ['mousedown', 'keydown', 'scroll', 'mousemove', 'touchstart'];
    
    // Attach listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [handleLogout]);

  return null; // This component renders nothing
}
