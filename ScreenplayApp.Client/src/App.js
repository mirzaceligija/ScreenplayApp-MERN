import React, { Component } from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from './store/actions/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";

const asyncScreenplays = asyncComponent(() => {
  return import('./containers/Screenplay/Screenplay');
});


const asyncRate = asyncComponent(() => {
  return import('./containers/Rate/Rate');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component{

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/rate" component={asyncRate} />
            <Route path="/" exact component={asyncScreenplays} />
            <Redirect to="/" />
          </Switch>
    );

    if(this.props.isAuthenticated) {
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/rate" component={asyncRate} />
        <Route path="/" exact component={asyncScreenplays} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
