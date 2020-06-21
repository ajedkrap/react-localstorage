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
    this.login = this.login.bind(this)
  }

  handlerChange(e, form) {
    e.preventDefault()
    this.setState({ [form]: e.target.value })
  }

  login(e) {
    e.preventDefault()
    const getData = JSON.parse(localStorage.getItem('token'))
    const { username, password } = this.state
    const message = document.getElementById("message")
    const checkUsername = username === getData.username
    const checkPassword = password === getData.password
    if (checkUsername && checkPassword) {
      setTimeout(() => {
        message.className = 'animate__animated animate__rubberBand text-success'
        this.setState({ message: 'Login Succesfull' })
      }, 10000)
      this.props.history.push('/home')
    } else {
      message.className = 'text-danger'
      this.setState({ message: 'Username & Password doesn\'t match' })
    }
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push({ pathname: '/', state: { message: 'You Have to Register' } })
    }
  }

  render() {
    return (
      <>
        <Row className='d-flex justify-content-end flex-grow-1 pt-5 w-100 p-0' style={{ zIndex: 2 }}>
          <Col md={6} className='d-flex justify-content-center align-items-center mr-5'>
            <Form onSubmit={(e) => this.login(e)} name='login' className='bg-light mx-5 p-3 px-5 w-100 rounded shadow-lg'>
              <p className='display-4 text-center'>Login</p>
              <div id='message'>{this.state.message !== '' && <div className='text-center'>{this.state.message}</div>}</div>
              <FormGroup row>
                <Label className='col-sm-4'>Username</Label>
                <Input className='col-sm-8' type="text" placeholder="username" onChange={(e) => this.handlerChange(e, 'username')} />
              </FormGroup>
              <FormGroup row>
                <Label className='col-sm-4'>Password</Label>
                <Input className='col-sm-8' type="text" placeholder="password" onChange={(e) => this.handlerChange(e, 'password')} />
              </FormGroup>
              <Container className='d-flex justify-content-between' fluid>
                <p onClick={() => this.props.history.push('/')}> &lt;&lt; Register</p>
                <Button type='submit'>Login</Button>
              </Container>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default Register