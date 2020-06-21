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
      message: '',
      mayLogin: false
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
    const message = document.getElementById("message")
    if (username !== '' && password !== '') {
      if (!(getUser === username)) {
        const whitespace = username.match(/^\S*$/)
        if (whitespace) {
          const passNumber = password.match(/[0-9]/g)
          const passSymbol = password.match(/[-!$%@^&*()_+|~=`{}[\]:";'<>?,./]/g)
          if (password && passNumber && passSymbol) {
            const data = {
              username,
              password
            }
            localStorage.setItem('token', JSON.stringify(data))
            message.className = 'text-success w-100'
            this.setState({ message: 'You are registered', mayLogin: !this.state.login })
          } else {
            message.className = 'text-danger w-100'
            this.setState({ message: 'password require number and symbol' })
          }
        } else {
          message.className = 'text-danger w-100'
          this.setState({ message: 'username should not contain space' })
        }
      } else {
        message.className = 'text-danger w-100'
        this.setState({ message: 'username is used' })
      }
    } else {
      message.className = 'text-danger w-100'
      this.setState({ message: 'form should not be empty' })
    }
  }


  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ mayLogin: !this.state.mayLogin })
    }
    if (this.state.message === this.props.location.state) {
      this.setState({ message: '' })
    }
  }

  render() {
    return (
      <>
        <Row className='d-flex justify-content-end flex-grow-1 pt-5 w-100 p-0' style={{ zIndex: 2 }}>
          <Col md={6} className='d-flex justify-content-center align-items-center mr-5'>
            <Form onSubmit={(e) => this.register(e)} name='register' className='bg-light mx-5 p-3 px-5 w-100 rounded shadow-lg'>
              <p className='display-4 text-center'>Register</p>
              <div id='message' className='text-danger w-100'>{this.state.message !== '' && <div className='text-center'>{this.state.message}</div>}</div>
              <FormGroup row>
                <Label className='col-sm-4'>Username</Label>
                <Input className='col-sm-8' type="text" placeholder="username" onChange={(e) => this.handlerChange(e, 'username')} />
              </FormGroup>
              <FormGroup row>
                <Label className='col-sm-4'>Password</Label>
                <Input className='col-sm-8' type="text" placeholder="password" onChange={(e) => this.handlerChange(e, 'password')} />
              </FormGroup>
              <Container className='d-flex justify-content-between' fluid>
                {this.state.mayLogin ? <p onClick={() => this.props.history.push('/login')}>>> Login</p> : <div />}
                <Button type='submit'>Register</Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default Register