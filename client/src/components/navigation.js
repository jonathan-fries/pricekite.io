import React from 'react';
import {Link, Route} from "react-router-dom";

export default class Navigation extends React.Component {


    render() {
        return <div><nav><ul className="header">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul></nav>
            {this.props.children}</div>;
    }

}
