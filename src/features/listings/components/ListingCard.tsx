import { motion } from 'framer-motion';
import clsx from 'clsx';
import { format } from 'date-fns';
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import numeral from 'numeral';
import { Listing } from '../types';
import styles from './ListingCard.module.css';

interface ListingCardProps {
  listing: Listing;
  saved: boolean;
  onToggleSave: () => void;
}

export default function ListingCard({ listing, saved, onToggleSave }: ListingCardProps) {
  const { title, location, price, rating, superhost, available, availableFrom, img } = listing;

  return (
    // motion.div replaces plain div — framer-motion handles the animation
    // initial = starting state (invisible, shifted down 20px)
    // animate = end state (fully visible, in normal position)
    // transition = how long and what easing the animation uses
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx(styles.card, {
        [styles.saved]: saved,
        [styles.luxury]: price > 300,
        [styles.booked]: !available,
        [styles.superhost]: superhost,
      })}
    >
      {/* Image + Heart Button */}
      <div className={styles.imageWrapper}>
        <img src={img} alt={title} className={styles.image} />
        <button className={styles.heart} onClick={onToggleSave}>
          {/* Swap icon based on saved state */}
          {saved ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Card Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        {/* Location with pin icon */}
        <div className={styles.location}>
          <FaMapMarkerAlt />
          {location}
        </div>

        {/* Rating and Price row */}
        <div className={styles.meta}>
          <div className={styles.rating}>
            <FaStar color="#ff385c" />
            {numeral(rating).format('0.00')}
          </div>
          <div className={styles.price}>
            {numeral(price).format('$0,0')}
            <span> / night</span>
          </div>
        </div>

        {/* Badges — only render when condition is true */}
        <div className={styles.tags}>
          {superhost && <span className={styles.superhostBadge}>Superhost</span>}
          {price > 300 && <span className={styles.luxuryBadge}>Luxury</span>}
          {available ? (
            <span className={styles.availableBadge}>Available</span>
          ) : (
            <span className={styles.bookedBadge}>Booked</span>
          )}
        </div>

        {/* Formatted date using date-fns */}
        <div className={styles.date}>
          Available from: {format(new Date(availableFrom), 'MMM dd, yyyy')}
        </div>
      </div>
    </motion.div>
  );
}