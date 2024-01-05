import React from 'react';
import { Rating } from 'react-simple-star-rating';
import "./StarRating.scss";

const StarRating = (props) => {
    return (
        <Rating
            // onClick={handleRating} 
            // ratingValue={props.rating} 
            readonly
            initialValue={props.rating}
            size={30}
            className={props.className}
        />
    );
}

export default StarRating;