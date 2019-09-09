import {Route} from "react-router-dom";
import Home from "./home";
import React from 'react';
import Navigation from "./navigation";
import About from './about';
import './appcontainer.scss';
import Footer from './footer';
import ComputeServerless from './compute_serverless.js'

export default class AppContainer extends React.Component {

    render() {
        return <div>
                <Navigation />
                <div className='clearBoth'></div>
                <div className='contentBox'>
                  <Route exact path="/" component={Home}/>
                  <Route path="/compute" component={ComputeServerless}/>
                  <Route path="/about" component={About}/>
                </div>
                <Footer/>
            </div>;
    }
}
