import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewTransation from './pages/Dashboard/new-transaction';
import Profile from './pages/Dashboard/profile';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/dashboard" exact component={Dashboard}/>
                <Route path="/dashboard/new-transaction" exact component={NewTransation}/>
                <Route path="/dashboard/profile" exact component={Profile}/>
            </Switch>
        </BrowserRouter>
    );
}