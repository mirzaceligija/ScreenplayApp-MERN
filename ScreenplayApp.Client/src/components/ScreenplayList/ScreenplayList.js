import React from 'react';

import ScreenplayCard from '../ScreenplayCard/ScreenplayCard';
import classes from './ScreenplayList.module.css';

const ScreenplayList = (props) => {

    const renderedList = props.screenplays.map((screenplay) => {
        return (
            <ScreenplayCard key={screenplay._id} screenplay={screenplay}/>
        );
    })

    return(
        <div className={classes.List}>
            {renderedList}
        </div>
    );
};

export default ScreenplayList;
