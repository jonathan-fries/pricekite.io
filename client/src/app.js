import React from 'react';

import {
    BrowserRouter
} from "react-router-dom";

import AppContainer from './components/appcontainer'


export default class App extends React.Component{


    render(){
        return <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>;

    }
}
