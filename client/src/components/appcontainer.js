import {Route} from "react-router-dom";
import React from 'react';
import Navigation from "./navigation";
import About from './about';
import './appcontainer.scss';
import Footer from './footer';
import ComputeServerless from './compute_serverless.js';
import ComputeServerlessInteractive from './compute_serverless_interactive.js';
import Regions from './regions.js';
import IpAddresses from './ipAddresses.js'

export default class AppContainer extends React.Component {

    render() {
        return <div>
                <Navigation />
                <div className='clearBoth'></div>
                <div className='contentBox'>
                  <Route exact path="/" component={ComputeServerless}/>
                  <Route path="/interactive_compute" component={ComputeServerlessInteractive}/>
                  <Route path="/ipAddresses" component={IpAddresses} />
                  <Route path="/regions" component={Regions}/>
                  <Route path="/about" component={About}/>
                </div>
                <Footer/>
            </div>;
    }
}
