import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import background from './assets/bg.jpg'

import {
  Container,
} from 'reactstrap'

import Register from './pages/register'
import Login from './pages/login'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Container className='h-100 p-0' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} fluid>
            <Route exact path='/' component={Register} />
            <Route exact path='/login' component={Login} />
          </Container>
        </Switch>
      </Router >
    )
  }
}

