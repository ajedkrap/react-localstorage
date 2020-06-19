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
    this.handlerChange = this.handlerChange.bind(this)
    this.register = this.register.bind(this)
  }

  handlerChange(e, form) {
    e.preventDefault()
    this.setState({ [form]: e.target.value })
  }

  register(e) {
    e.preventDefault()
    const getUser = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).username : null
    const { username, password } = this.state
    if (!(getUser === username)) {
      const passNumber = password.match(/[0-9]/g)
      const passSymbol = password.match(/[-!$%@^&*()_+|~=`{}[\]:";'<>?,./]/g)
      if (password && passNumber && passSymbol) {
        const data = {
          username,
          password
        }
        localStorage.setItem('token', JSON.stringify(data))
        this.setState({ message: 'You are registered' })
      } else {
        this.setState({ message: 'password require number and symbol' })
      }
    } else {
      this.setState({ message: 'username is used' })
    }
  }

  render() {
    return (
      <Row className='d-flex justify-content-end h-100 p-0'>
        <Col md={6} className='d-flex justify-content-center align-items-center mr-5'>
          <Form onSubmit={(e) => this.register(e)} name='register' className='bg-light mx-5 p-3 px-5 w-100 rounded shadow-lg'>
            <p className='display-4 text-center'>Register</p>
            {this.state.message !== '' && <div className='text-danger text-center'>{this.state.message}</div>}
            <FormGroup row>
              <Label className='col-sm-4'>Username</Label>
              <Input className='col-sm-8' type="text" placeholder="username" onChange={(e) => this.handlerChange(e, 'username')} />
            </FormGroup>
            <FormGroup row>
              <Label className='col-sm-4'>Password</Label>
              <Input className='col-sm-8' type="text" placeholder="password" onChange={(e) => this.handlerChange(e, 'password')} />
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