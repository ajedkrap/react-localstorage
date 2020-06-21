import React, { Component } from 'react'
import {
  Row, Col
} from 'reactstrap'

import HomeContent from '../components/home'
import EditContent from '../components/edit'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inHome: true,
      inEdit: false
    }
    this.homeAndEditToggle = this.homeAndEditToggle.bind(this)
  }

  homeAndEditToggle() {
    this.setState({ inHome: !this.state.inHome, inEdit: !this.state.inEdit })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  UNSAFE_componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/', { message: 'Can\'t Access' })
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem('token'))
    return (
      <Row className='d-flex justify-content-center m-5 flex-grow-1 p-0 no-gutters' style={{ zIndex: 2 }}>
        <Col md={8} className='d-flex align-items-center justify-content-center animate__animated animate__zoomIn mb-5 py-5 bg-light flex-column rounded shadow-lg'>
          {this.state.inHome && <HomeContent setUser={user} getEdit={() => this.homeAndEditToggle()} logOut={() => this.props.history.push('/', { message: 'You are Logged Out' })} />}
          {this.state.inEdit && <EditContent setUser={user} getHome={() => this.homeAndEditToggle()} />}
        </Col>
      </Row>
    )
  }
}

export default Home 