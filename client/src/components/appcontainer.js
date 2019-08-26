import {Route} from "react-router-dom";
import Home from "./home";
import React from 'react';
import RbNavBar from "./rbNavBar";
import About from './about';
import './appcontainer.scss';
import Footer from './footer';

export default class AppContainer extends React.Component {

    render() {
        return <div>
                <RbNavBar />
                <div className='clearBoth'></div>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Footer/>
            </div>;
    }
}
