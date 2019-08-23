import React from 'react';
import Navigation from './navigation';
import style from './header.scss';

export default class Header extends React.Component {

    render() {
        return <div className='header'>
            <Navigation/>
            <div className='headerLogo'><img src='/images/pricekite_logo.png'/></div>
        </div>;
    }

}
