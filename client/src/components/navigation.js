import React from 'react';
import {Link, Route} from "react-router-dom";
import './navigation.scss'

export default class Navigation extends React.Component {


    render() {
        return <div className="nav">
            <nav><ul>
                <li class="icon">
                    <a href="javascript:void(0);" onclick="myFunction()" class="icon"><img src="/images/navicon_small.png" /></a>
                </li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul></nav>
            {this.props.children}</div>;
    }

}
