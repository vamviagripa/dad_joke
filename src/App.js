import React from 'react';
import logo from './logo.svg';
import './assets/stylesheets/App.css';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
import ClassName from "./views/dad_joke";


function App() {
    return (
        <div className={'App '}>
            <header className="App-header">
                <div className="container">
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" name={'Home Page'} component={Home}/>
                            <Route exact path="/dad_joke" name={'Dad Joke'} component={ClassName}/>
                        </Switch>
                    </HashRouter>
                </div>
            </header>

        </div>
    );
}

const Home = () => {
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>This is a Dad Joke app made by Mavs, using ReactJS</p>
            <Link to={'/dad_joke'}>
                <a className="App-link">Continue</a>
            </Link>
        </div>
    )
};


export default App;
