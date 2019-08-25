import React from 'react';
import {Link, Route} from "react-router-dom";
import './navigation.scss'

export default class Navigation extends React.Component {


    render() {
        return <div className="nav"><nav><ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul></nav>
            {this.props.children}</div>;
    }

}
