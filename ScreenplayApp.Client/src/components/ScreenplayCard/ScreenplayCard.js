import React from 'react';
import notFoundImage from '../../assets/images/Image404.jpeg';

import classes from './ScreenplayCard.module.css';

const ScreenplayCard = ({screenplay}) => {

    let renderImage = <img src={notFoundImage} alt="Poster"/>

    return(
        screenplay ? 
        <div className={classes.Card}>
            <div>
                {
                    screenplay?.photoURL ?
                    <img src={screenplay.photoURL} alt={screenplay.title}/> :
                    renderImage
                }
            </div>
            <section>
                <h2>{screenplay?.title}</h2>
                <p>{screenplay?.description}</p>
                <p>{screenplay?.rate} ({screenplay?.votes} votes)</p>
                <p className={classes.Category}>{screenplay.category?.name}</p>
            </section>
        </div>
        : <div>Nothing to load</div>
    );
};

export default ScreenplayCard;
