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

  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <Row className='d-flex justify-content-end h-100 p-0'>
        <Col md={6} className='d-flex justify-content-center align-items-center mr-5'>
          <Form name='register' className='bg-light mx-5 p-3 px-5 w-100 rounded shadow-lg'>
            <p className='display-4 text-center'>Login</p>
            {this.state.message !== '' && <div className='text-danger text-center'>{this.state.message}</div>}
            <FormGroup row>
              <Label className='col-sm-4'>Username</Label>
              <Input className='col-sm-8' type="email" placeholder="email" />
            </FormGroup>
            <FormGroup row>
              <Label className='col-sm-4'>Password</Label>
              <Input className='col-sm-8' type="text" placeholder="password" />
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