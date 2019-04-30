import React from 'react';
import {
 Router, Route, hashHistory, IndexRoute, 
} from 'react-router';
import Home from './Home';
import Layout from './Layout';


class AppRouter extends React.Component {
    isLogin() {
        // const token = $.cookie('token');
        // if (!token) {
        //   hashHistory.push('/login');
        // }
    }
    
    render() {
        return (
          <Router history={hashHistory}>
            {/* <Route path='/login' component={ Login }/> */}
            <Route path="/" component={Layout} onEnter={this.isLogin}>
              <IndexRoute component={Home} />
            </Route>
            <Route path="/:id" component={Layout} onEnter={this.isLogin} />
          </Router>
        );
    }
}
export default AppRouter;
