import React from 'react';
import {Link, Route} from "react-router-dom";
import './navigation.scss'

export default class Navigation extends React.Component {

    responsiveMenu(){
      var x = document.getElementById("topNavDiv");
      if (x.className === "nav") {
          x.className += " responsive";
      } else {
          x.className = "nav";
      }
    }

    render() {
        return <div id="topNavDiv" className="nav">
            <nav><ul>
                <li class="icon">
                    <a href="javascript:void(0);" onClick={this.responsiveMenu} class="icon"><img src="/images/navicon_small.png" /></a>
                </li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul></nav>
            {this.props.children}</div>;
    }

}
