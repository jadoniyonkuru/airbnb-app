import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { personalSchema, PersonalFormData } from '../schemas/booking';

interface StepPersonalProps {
  onNext: (data: PersonalFormData) => void;
  onBack: () => void;
  defaultValues?: Partial<PersonalFormData>;
}

export default function StepPersonal({ onNext, onBack, defaultValues }: StepPersonalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues,
  });

  // Local state for image preview URL and file size error
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState('');

  // Handle file input — validate size and generate preview URL
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size — 5MB max
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File must be under 5MB');
      setPreview(null);
      return;
    }

    setFileError('');
    // createObjectURL generates a local URL for the preview image
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* First Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>First Name</label>
          <input
            type="text"
            {...register('firstName')}
            placeholder="John"
            style={inputStyle}
          />
          {errors.firstName && <p style={errorStyle}>{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Doe"
            style={inputStyle}
          />
          {errors.lastName && <p style={errorStyle}>{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            style={inputStyle}
          />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>Phone</label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="+1 234 567 8900"
            style={inputStyle}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>

        {/* Profile photo upload */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: '#222' }}>
            Profile Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ fontSize: '0.9rem' }}
          />
          {/* File size validation error */}
          {fileError && <p style={errorStyle}>{fileError}</p>}

          {/* Live image preview — only shows when a valid file is selected */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginTop: '8px',
                border: '2px solid #ff385c',
              }}
            />
          )}
        </div>

        {/* Navigation buttons */}
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