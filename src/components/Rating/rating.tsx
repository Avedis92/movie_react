import React from 'react';
import Star from '../reacticons/staricons';
import HalfStar from '../reacticons/halfstar';
import EmptyStar from '../reacticons/emptystar';

function RatingStars({ movieRating }:{movieRating:number|undefined}) {
  const stars = new Array(5).fill(<EmptyStar />);
  if (typeof movieRating === 'number') {
    const rating = Math.round(movieRating);
    if (rating % 2 === 0) {
      stars.fill(<Star />, 0, (rating / 2));
    } else {
      stars.fill(<Star />, 0, (Math.floor(rating / 2)));
      stars.fill(<HalfStar />, Math.floor(rating / 2), (Math.floor(rating / 2)) + 1);
    }
  }
  return (
    <>
      {stars.map((icons, index) => (
        <React.Fragment key={index}>
          {icons}
        </React.Fragment>
      ))}
    </>
  );
}

export default RatingStars;
