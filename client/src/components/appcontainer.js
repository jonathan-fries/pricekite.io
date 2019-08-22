import {Route} from "react-router-dom";
import Home from "./home";
import React from 'react';
import Navigation from './navigation';

export default class Nav extends React.Component {


    render() {
        return <Navigation>
                <Route exact path="/" component={Home}/>
            </Navigation>;
    }
}
