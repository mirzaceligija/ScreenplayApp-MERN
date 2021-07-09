import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact> Home </NavigationItem>
            <NavigationItem link="/rate"> Rate </NavigationItem>
            {
            props.isAuth ? 
            <NavigationItem link="/logout"> Logout </NavigationItem> : 
            <NavigationItem link="/auth"> Auth </NavigationItem>
            }
            
        </ul>
    );
}

export default NavigationItems;