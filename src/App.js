import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import background from './assets/bg.jpg'

import {
  Container,
} from 'reactstrap'

import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'

const RT = styled.marquee`
  position: absolute;
  font-size: 16vh;
  color: rgba(0,0,0,0.25);
  height: auto;
  width: 100%;
  z-index: 1;
  margin-left: 0;
  animation: scroll 7s linear 0s infinite;
  
`

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Container className='d-flex flex-column justify-content-end h-100 w-100 p-0' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} fluid>

              <Route exact path='/' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/home' component={Home} />
              <RT direction='right'>
                WELCOME
              </RT>
            </Container>
          </Switch>
        </Router >
      </>
    )
  }
}

