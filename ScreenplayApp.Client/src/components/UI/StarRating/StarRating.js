import React, { useState } from 'react';
import axios from '../../../axios/axios';
import { FaStar} from 'react-icons/fa';
import classes from './StarRating.module.css';

const StarRating = (props) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const rateScreenplay = async (event) => {
        setRating(event.target.value)
        props.updateScreenplay(event.target.value, props.screenplayId);
    }

    return(
        <div className={classes.StarRating}> 
            
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;
                return(
                    <label key={i}>
                        <input type="radio" name="rating"
                            value={ratingValue}
                            onClick={rateScreenplay}/>
                        <FaStar className={classes.Star}
                            color={ratingValue<= (hover || rating) ? '#fdcb6e' : '#dfe6e9'}
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}/>
                    </label>
                );
            })}
        </div>
    );
}

export default StarRating;