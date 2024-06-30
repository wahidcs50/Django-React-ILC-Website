import React from 'react';
import PropTypes from 'prop-types';
import './SkillsRatings.css'; // Create a CSS file for the star rating styles

const StarRating = ({ count, value, onChange }) => {
  const stars = Array.from({ length: count }, (v, i) => i + 1);

  return (
    <div className="star-rating">
      {stars.map(star => (
        <span
          key={star}
          className={`star ${value >= star ? 'filled' : ''}`}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

StarRating.defaultProps = {
  count: 5,
  value: 0,
};

export default StarRating;
