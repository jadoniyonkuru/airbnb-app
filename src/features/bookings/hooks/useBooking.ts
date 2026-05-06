import { useState } from 'react';
import { BookingData } from '../types';
import toast from 'react-hot-toast';

export function useBooking() {
  // Track which step we are on — 0 indexed
  const [currentStep, setCurrentStep] = useState(0);

  // Accumulate data from each step as user progresses
  const [bookingData, setBookingData] = useState<BookingData>({});

  // Called when user completes a step and clicks Continue
  // Merges new step data into accumulated bookingData
  const next = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  // Go back to previous step — data is preserved
  const back = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // Final submit — called from StepConfirmation
  const submit = async () => {
    try {
      // In production: await api.post('/bookings', bookingData)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Booking confirmed! 🎉');
      // Reset form after successful booking
      setCurrentStep(0);
      setBookingData({});
    } catch {
      toast.error('Booking failed. Please try again.');
    }
  };

  return {
    currentStep,
    bookingData,
    next,
    back,
    submit,
  };
}