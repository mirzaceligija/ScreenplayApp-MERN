import React from 'react';

import appLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={appLogo} alt="AppLogo"></img>
    </div>
);

export default Logo;