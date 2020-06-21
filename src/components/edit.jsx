import React, { Component } from 'react'
import {
  Row, Col, Button, Input
} from 'reactstrap'

export default class EditContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      username: '',
      password: '',
      message: ''
    }
    this.setEdit = this.setEdit.bind(this)
    this.edit = this.edit.bind(this)
    this.handlerChange = this.handlerChange.bind(this)
  }

  handlerChange(e, form) {
    e.preventDefault()
    this.setState({ [form]: e.target.value })
  }

  goHome(e) {
    e.preventDefault()
    this.setState({ isEditing: false })
    this.props.getHome()
  }

  setEdit(e) {
    e.preventDefault()
    this.setState({ isEditing: !this.state.isEditing })
  }

  edit(e) {
    e.preventDefault()
    const { username, password } = this.state
    const message = document.getElementById("message")
    if (username !== '' && password !== '') {
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
          message.className = 'text-success'
          this.setState({ isEditing: !this.state.isEditing, message: 'Your data has been updated' })
        } else {
          message.className = 'text-danger'
          this.setState({ message: 'password require number and symbol' })
        }
      } else {
        message.className = 'text-danger'
        this.setState({ message: 'username should not contain space' })
      }

    } else {
      message.className = 'text-danger'
      this.setState({ message: 'form should not be empty' })
    }
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const { username } = this.props.setUser
    return (
      <>
        <Row className='d-flex justify-content-center w-100'>
          <div className='d-flex display-4 mb-2 justify-content-center w-100'>Edit Profile</div>
          <div id='message'> {this.state.message !== '' && <div className='text-center'>{this.state.message}</div>}</div>
          <div className='my-3 mx-5 w-100'>
            <Row className='d-flex justify-content-center text-center mt-2'>
              <Col>
                Username:
            </Col>
              <Col >
                {this.state.isEditing ? <Input type='text' onChange={(e) => this.handlerChange(e, 'username')} className='w-100' placeholder='username' /> : username}
              </Col>
            </Row>
            {this.state.isEditing && (
              <Row className='d-flex justify-content-center text-center mt-2'>
                <Col >
                  Password:
              </Col>
                <Col >
                  <Input type='text' className='w-100' onChange={(e) => this.handlerChange(e, 'password')} placeholder='password' />
                </Col>
              </Row>
            )}
          </div>
        </Row>
        <div className='d-flex mt-5 justify-content-between'>
          <Button onClick={(e) => this.goHome(e)} className='mx-2' color='info'>&lt; Home</Button>
          {this.state.isEditing ?
            <Button onClick={(e) => this.edit(e)} color='primary' className='mx-2'> Edit </Button> :
            <Button onClick={(e) => this.setEdit(e)} color='warning' className='mx-2'> Edit </Button>
          }
        </div>
      </>
    )
  }
}