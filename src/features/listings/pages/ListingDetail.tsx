import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { FaStar, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { useStore } from '../../../store/storeContext';
import { useFavorites } from '../hooks/useFavorites';
import BookingForm from '../../bookings/components/BookingForm';

export default function ListingDetail() {
  // Extract the id from the URL e.g. /listings/3 → id = "3"
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useStore();
  const { isSaved, toggle } = useFavorites();

  // Local state — only controls booking form visibility
  const [showBooking, setShowBooking] = useState(false);

  // Find the matching listing — convert id string to number first
  const listing = state.listings.find((l) => l.id === Number(id));

  // Guard — show fallback if listing not found in store
  if (!listing) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ color: '#222' }}>Listing not found</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            borderRadius: '24px',
            background: '#ff385c',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const {
    title,
    location,
    price,
    rating,
    superhost,
    available,
    availableFrom,
    img,
    category,
  } = listing;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>

      {/* Back button — navigate(-1) goes to previous page in history */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          fontWeight: 600,
          color: '#222',
          cursor: 'pointer',
          marginBottom: '24px',
          fontSize: '0.95rem',
        }}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Hero image */}
      <img
        src={img}
        alt={title}
        style={{
          width: '100%',
          height: '420px',
          objectFit: 'cover',
          borderRadius: '16px',
          marginBottom: '28px',
        }}
      />

      {/* Title row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
      }}>
        <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>
          {title}
        </h1>

        {/* Save button — reads from store via useFavorites */}
        <button
          onClick={() => toggle(listing.id, title)}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            border: '1.5px solid #ff385c',
            background: isSaved(listing.id) ? '#ff385c' : '#fff',
            color: isSaved(listing.id) ? '#fff' : '#ff385c',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {isSaved(listing.id) ? '❤️ Saved' : '🤍 Save'}
        </button>
      </div>

      {/* Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#717171',
        marginBottom: '16px',
      }}>
        <FaMapMarkerAlt color="#ff385c" />
        {location}
      </div>

      {/* Meta row — rating, price, category */}
      <div style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FaStar color="#ff385c" />
          <span style={{ fontWeight: 600 }}>
            {numeral(rating).format('0.00')}
          </span>
        </div>

        <div>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
            {numeral(price).format('$0,0')}
          </span>
          <span style={{ color: '#717171' }}> / night</span>
        </div>

        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          background: '#f0f0f0',
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {category}
        </span>
      </div>

      {/* Badges */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '24px',
      }}>
        {superhost && (
          <span style={{
            padding: '4px 12px',
            borderRadius: '20px',
            background: '#fff8dc',
            color: '#a07800',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}>
            ⭐ Superhost
          </span>
        )}

        <span style={{
          padding: '4px 12px',
          borderRadius: '20px',
          background: available ? '#e6f4ea' : '#fdecea',
          color: available ? '#1e7e34' : '#c0392b',
          fontWeight: 600,
          fontSize: '0.85rem',
        }}>
          {available ? 'Available' : 'Booked'}
        </span>

        {price > 300 && (
          <span style={{
            padding: '4px 12px',
            borderRadius: '20px',
            background: '#fff8dc',
            color: '#a07800',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}>
            💎 Luxury
          </span>
        )}
      </div>

      {/* Available from — dayjs formats the ISO date string */}
      <div style={{
        padding: '20px',
        background: '#f7f7f7',
        borderRadius: '12px',
        color: '#444',
        marginBottom: '24px',
      }}>
        <p style={{ margin: 0, fontWeight: 600 }}>Available from</p>
        <p style={{ margin: '4px 0 0', fontSize: '1.1rem', color: '#222' }}>
          {/* dayjs is lighter than date-fns — same result, 2kb vs 13kb */}
          {dayjs(availableFrom).format('MMMM D, YYYY')}
        </p>
      </div>

      {/* Book Now button — toggles booking form visibility */}
      <button
        onClick={() => setShowBooking((prev) => !prev)}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          background: '#ff385c',
          color: '#fff',
          border: 'none',
          fontWeight: 700,
          fontSize: '1.1rem',
          cursor: 'pointer',
        }}
      >
        {showBooking ? 'Hide Booking Form' : 'Book Now'}
      </button>

      {/* Booking form — renders below button when showBooking is true */}
      {showBooking && (
        <div style={{ marginTop: '24px' }}>
          <BookingForm />
        </div>
      )}
    </div>
  );
}