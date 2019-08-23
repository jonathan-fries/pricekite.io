import {Route} from "react-router-dom";
import Home from "./home";
import React from 'react';
import Header from './header';
import About from './about';

export default class Nav extends React.Component {


    render() {
        return <div>
                <Header />
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
            </div>;
    }
}
