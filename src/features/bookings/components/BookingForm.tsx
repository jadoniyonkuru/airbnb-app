import { useBooking } from '../hooks/useBooking';
import StepDates from './StepDates';
import StepPersonal from './StepPersonal';
import StepPayment from './StepPayment';
import StepConfirmation from './StepConfirmation';

export default function BookingForm() {
  const { currentStep, bookingData, next, back, submit } = useBooking();

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
        {['Dates', 'Personal', 'Payment', 'Confirm'].map((label, i) => (
          <div key={label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              height: '4px',
              borderRadius: '2px',
              background: i <= currentStep ? '#ff385c' : '#f0f0f0',
              marginBottom: '4px',
            }} />
            <span style={{
              fontSize: '0.7rem',
              color: i <= currentStep ? '#ff385c' : '#999',
              fontWeight: i === currentStep ? 700 : 400,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {currentStep === 0 && (
        <StepDates
          defaultValues={bookingData.dates}
          onNext={(data) => next({ dates: data })}
        />
      )}
      {currentStep === 1 && (
        <StepPersonal
          defaultValues={bookingData.personal}
          onNext={(data) => next({ personal: data })}
          onBack={back}
        />
      )}
      {currentStep === 2 && (
        <StepPayment
          defaultValues={bookingData.payment}
          onNext={(data) => next({ payment: data })}
          onBack={back}
        />
      )}
      {currentStep === 3 && (
        <StepConfirmation
          bookingData={bookingData}
          onBack={back}
          onSubmit={submit}
        />
      )}
    </div>
  );
}
