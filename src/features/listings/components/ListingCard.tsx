import clsx from 'clsx';
import { format } from 'date-fns';
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import numeral from 'numeral';
import { Listing } from '../types';
import './ListingCard.css';

interface ListingCardProps {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
}

export default function ListingCard({ listing, saved, onToggleSave }: ListingCardProps) {
  const {
    title,
    location,
    price,
    rating,
    superhost,
    available,
    availableFrom,
    img,
  } = listing;

  return (
    <div
      className={clsx('card', {
        'card--saved': saved,
        'card--luxury': price > 300,
        'card--booked': !available,
      })}
    >
      {/* Image + Heart */}
      <div className="card__image-wrapper">
        <img src={img} alt={title} className="card__image" />
        <button className="card__heart" onClick={onToggleSave}>
          {saved ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Body */}
      <div className="card__body">
        <h3 className="card__title">{title}</h3>

        <div className="card__location">
          <FaMapMarkerAlt />
          {location}
        </div>

        <div className="card__meta">
          <div className="card__rating">
            <FaStar color="#ff385c" />
            {numeral(rating).format('0.00')}
          </div>
          <div className="card__price">
            {numeral(price).format('$0,0')}
            <span> / night</span>
          </div>
        </div>

        {/* Tags */}
        <div className="card__tags">
          {superhost && <span className="badge badge--superhost">Superhost</span>}
          {price > 300 && <span className="badge badge--luxury">Luxury</span>}
          {available ? (
            <span className="badge badge--available">Available</span>
          ) : (
            <span className="badge badge--booked">Booked</span>
          )}
        </div>

        <div className="card__date">
          Available from: {format(new Date(availableFrom), 'MMM dd, yyyy')}
        </div>
      </div>
    </div>
  );
}