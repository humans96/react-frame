import React from 'react';
import Home from './Home';
import Num from './Num';
import Random from './Random';
import { Router, Route, browserHistory } from 'react-router';


class AppRouter extends React.Component {
    render(){
        return (
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
            <Route path="/random" component={Random}/>
            <Route path="/num" component={Num}/>
            </Route>
        </Router>
        )
    }
}
export default AppRouter;