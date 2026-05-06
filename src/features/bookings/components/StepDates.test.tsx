import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StepDates from './StepDates';

// Helper to render StepDates with a mock onNext callback
const renderStepDates = (onNext = vi.fn()) => {
  return render(
    <MemoryRouter>
      <StepDates onNext={onNext} />
    </MemoryRouter>
  );
};

describe('BookingForm — StepDates Validation', () => {
  it('shows validation errors when submitted empty', async () => {
    renderStepDates();

    // Click Continue without filling anything in
    fireEvent.click(screen.getByText('Continue →'));

    await waitFor(() => {
      // Zod schema errors should appear inline under each field
      expect(
        screen.getByText('Check-in date is required')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Check-out date is required')
      ).toBeInTheDocument();
    });
  });

  it('advances to next step when all fields are valid', async () => {
    const onNext = vi.fn();
    renderStepDates(onNext);

    // Fill in valid dates
    fireEvent.change(screen.getByLabelText('Check-in'), {
      target: { value: '2025-03-01' },
    });
    fireEvent.change(screen.getByLabelText('Check-out'), {
      target: { value: '2025-03-07' },
    });
    fireEvent.change(screen.getByLabelText('Guests'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByText('Continue →'));

    await waitFor(() => {
      // onNext should be called once with the form data
      expect(onNext).toHaveBeenCalledTimes(1);
    });
  });

  it('shows error when check-out is before check-in', async () => {
    renderStepDates();

    // Set check-out before check-in — triggers refine validation
    fireEvent.change(screen.getByLabelText('Check-in'), {
      target: { value: '2025-03-10' },
    });
    fireEvent.change(screen.getByLabelText('Check-out'), {
      target: { value: '2025-03-05' },
    });
    fireEvent.change(screen.getByLabelText('Guests'), {
      target: { value: '2' },
    });

    fireEvent.click(screen.getByText('Continue →'));

    await waitFor(() => {
      // Cross-field refine error from the Zod schema
      expect(
        screen.getByText('Check-out must be after check-in')
      ).toBeInTheDocument();
    });
  });
});
