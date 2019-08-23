import React from 'react';
import Navigation from './navigation';

export default class Header extends React.Component {

    render() {
        return <div>
            <Navigation/>
            <img src='/images/pricekite_logo.png'/>
        </div>;
    }

}
