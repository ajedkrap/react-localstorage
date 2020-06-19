import React, { Component } from 'react'
import {
  Container, Row, Col,
  Form, FormGroup, Input, Label, Button
} from 'reactstrap'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message: ''
    }
    this.checkPassword = this.checkPassword.bind(this)
  }

  checkPassword(e) {
    e.preventDefault()
    const pass = e.target.value
    const passNumber = pass.match(/[0-9]/g)
    const passSymbol = pass.match(/[-!$%@^&*()_+|~=`{}[\]:";'<>?,./]/g)
    if (pass && passNumber && passSymbol) {
      this.setState({ password: e.target.value })
      this.setState({ message: '' })
    } else {
      this.setState({ message: 'password require number and symbol' })
    }

  }


  register(e) {
    e.preventDefault()
    const getData = JSON.parse(localStorage.getItem('token'))
    const { username, password } = this.state
    if (!(getData.username === username)) {
      const data = {
        username,
        password
      }
      localStorage.setItem('token', data)
      this.setState({ message: 'You are registered' })
    } else {
      this.setState({ message: 'username is used' })
    }
  }

  render() {
    return (
      <Row className='d-flex justify-content-end h-100 p-0'>
        <Col md={6} className='d-flex justify-content-center align-items-center mr-5'>
          <Form onSubmit={this.register} name='register' className='bg-light mx-5 p-3 px-5 w-100 rounded shadow-lg'>
            <p className='display-4 text-center'>Register</p>
            {this.state.message !== '' && <div className='text-danger text-center'>{this.state.message}</div>}
            <FormGroup row>
              <Label className='col-sm-4'>Username</Label>
              <Input className='col-sm-8' type="text" placeholder="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
            </FormGroup>
            <FormGroup row>
              <Label className='col-sm-4'>Password</Label>
              <Input className='col-sm-8' type="text" placeholder="password" onChange={this.checkPassword} />
            </FormGroup>
            <Container className='d-flex justify-content-end' fluid>
              <Button type='submit'>Register</Button>
            </Container>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Register