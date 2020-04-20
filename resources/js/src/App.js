import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';

const App = () => {
    return (
        <Router className="App__container">
            <Switch>
                <Route exact path="/admin/">
                    <Home/>
                </Route>
                <Route path="/admin/add">
                    <Add/>
                </Route>
                <Route path="/admin/edit/:id">
                    <Edit/>
                </Route>
            </Switch>
        </Router>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}