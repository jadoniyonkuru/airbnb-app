import { BookingData } from '../types';
import numeral from 'numeral';

interface StepConfirmationProps {
  bookingData: BookingData;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepConfirmation({
  bookingData,
  onBack,
  onSubmit,
}: StepConfirmationProps) {
  const { dates, personal, payment } = bookingData;

  // Calculate number of nights for price summary
  const nights =
    dates?.checkIn && dates?.checkOut
      ? Math.ceil(
          (new Date(dates.checkOut).getTime() -
            new Date(dates.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3 style={{ margin: 0, color: '#222' }}>Review your booking</h3>

      {/* Dates summary */}
      <div style={sectionStyle}>
        <p style={labelStyle}>DATES</p>
        <p style={valueStyle}>
          {dates?.checkIn} → {dates?.checkOut}
        </p>
        <p style={valueStyle}>{dates?.guests} guest(s) · {nights} night(s)</p>
      </div>

      {/* Personal info summary */}
      <div style={sectionStyle}>
        <p style={labelStyle}>GUEST</p>
        <p style={valueStyle}>{personal?.firstName} {personal?.lastName}</p>
        <p style={valueStyle}>{personal?.email}</p>
        <p style={valueStyle}>{personal?.phone}</p>
      </div>

      {/* Payment summary — mask card number for security */}
      <div style={sectionStyle}>
        <p style={labelStyle}>PAYMENT</p>
        <p style={valueStyle}>
          **** **** **** {payment?.cardNumber.slice(-4)}
        </p>
        <p style={valueStyle}>Expires {payment?.expiry}</p>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button type="button" onClick={onBack} style={backButtonStyle}>
          ← Back
        </button>
        {/* onSubmit calls useBooking's submit() — posts to API */}
        <button type="button" onClick={onSubmit} style={buttonStyle}>
          Confirm Booking 🎉
        </button>
      </div>
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: '#f7f7f7',
  borderRadius: '10px',
  padding: '16px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#999',
  margin: '0 0 6px',
  letterSpacing: '0.05em',
};

const valueStyle: React.CSSProperties = {
  margin: '2px 0',
  color: '#222',
  fontSize: '0.95rem',
};

const buttonStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px',
  borderRadius: '8px',
  background: '#ff385c',
  color: '#fff',
  border: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  cursor: 'pointer',
};

const backButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px',
  borderRadius: '8px',
  background: '#fff',
  color: '#222',
  border: '1.5px solid #ddd',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
};