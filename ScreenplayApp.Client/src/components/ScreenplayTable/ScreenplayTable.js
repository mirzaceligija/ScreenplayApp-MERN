import React from 'react';
import StarRating from '../UI/StarRating/StarRating';

import classes from './ScreenplayTable.module.css';

const ScreenplayTable = (props) => {

    let renderedRows = <p>Can't fetch movies</p>
    if(props.screenplays) {
        renderedRows = props.screenplays.map((screenplay, index=1) => {
            return (
                <tr key={screenplay._id} screenplay={screenplay}>
                    <td>{index}</td>
                    <td>{screenplay?.title}</td>
                    <td>{screenplay?.rate} ({screenplay?.votes} votes)</td>
                    <td><StarRating screenplayId={screenplay._id} updateScreenplay={props.onRate}/></td>
                </tr>
            );
        })
    }
    
    return(
        <div className={classes.Table}>
            <table>
                <thead>
                    <tr>
                        <th> #</th>
                        <th> Title</th>
                        <th> Rate (Votes)</th>
                        <th> Your Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedRows}
                </tbody>
            </table>
        </div>
    );
};

export default ScreenplayTable;
