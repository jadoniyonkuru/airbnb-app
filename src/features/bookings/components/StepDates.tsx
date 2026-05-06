import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { datesSchema, DatesFormData } from '../schemas/booking';

interface StepDatesProps {
  onNext: (data: DatesFormData) => void;
  defaultValues?: Partial<DatesFormData>;
}

export default function StepDates({ onNext, defaultValues }: StepDatesProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatesFormData>({
    // zodResolver connects react-hook-form with our Zod schema
    // validation runs automatically on submit and field blur
    resolver: zodResolver(datesSchema),
    defaultValues: defaultValues || { guests: 1 },
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Check-in date */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="checkIn" style={{ fontWeight: 600, color: '#222' }}>Check-in</label>
          <input
            id="checkIn"
            type="date"
            {...register('checkIn')}
            style={inputStyle}
          />
          {/* Inline error — only renders when field has an error */}
          {errors.checkIn && (
            <p style={errorStyle}>{errors.checkIn.message}</p>
          )}
        </div>

        {/* Check-out date */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="checkOut" style={{ fontWeight: 600, color: '#222' }}>Check-out</label>
          <input
            id="checkOut"
            type="date"
            {...register('checkOut')}
            style={inputStyle}
          />
          {/* This also shows the cross-field refine error from the schema */}
          {errors.checkOut && (
            <p style={errorStyle}>{errors.checkOut.message}</p>
          )}
        </div>

        {/* Guests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="guests" style={{ fontWeight: 600, color: '#222' }}>Guests</label>
          <input
            id="guests"
            type="number"
            {...register('guests', { valueAsNumber: true })}
            min={1}
            max={16}
            style={inputStyle}
          />
          {errors.guests && (
            <p style={errorStyle}>{errors.guests.message}</p>
          )}
        </div>

        <button type="submit" style={buttonStyle}>
          Continue →
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1.5px solid #ddd',
  fontSize: '0.95rem',
  outline: 'none',
};

const errorStyle: React.CSSProperties = {
  color: '#c0392b',
  fontSize: '0.82rem',
  margin: 0,
};

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '8px',
  background: '#ff385c',
  color: '#fff',
  border: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '8px',
};