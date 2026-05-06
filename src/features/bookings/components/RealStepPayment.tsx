import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, PaymentFormData } from '../schemas/booking';

interface StepPaymentProps {
  onNext: (data: PaymentFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<PaymentFormData>;
}

export default function StepPayment({ onNext, onBack, defaultValues }: StepPaymentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>Name on Card</label>
          <input
            type="text"
            {...register('nameOnCard')}
            placeholder="John Doe"
            style={inputStyle}
          />
          {errors.nameOnCard && <p style={errorStyle}>{errors.nameOnCard.message}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>Card Number</label>
          <input
            type="text"
            {...register('cardNumber')}
            placeholder="1234567812345678"
            maxLength={16}
            style={inputStyle}
          />
          {errors.cardNumber && <p style={errorStyle}>{errors.cardNumber.message}</p>}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: 600, color: '#222' }}>Expiry</label>
            <input
              type="text"
              {...register('expiry')}
              placeholder="MM/YY"
              style={inputStyle}
            />
            {errors.expiry && <p style={errorStyle}>{errors.expiry.message}</p>}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontWeight: 600, color: '#222' }}>CVV</label>
            <input
              type="text"
              {...register('cvv')}
              placeholder="123"
              maxLength={4}
              style={inputStyle}
            />
            {errors.cvv && <p style={errorStyle}>{errors.cvv.message}</p>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button type="button" onClick={onBack} style={backButtonStyle}>
            ← Back
          </button>
          <button type="submit" style={buttonStyle}>
            Continue →
          </button>
        </div>
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
