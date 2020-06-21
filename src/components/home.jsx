import React, { Component } from 'react'
import {
  Button
} from 'reactstrap'

export default class HomeContent extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }



  logout(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    this.props.logOut()
  }

  render() {
    const { username } = this.props.setUser
    return (
      <>
        <p className='display-2'>Hello,</p>
        <p className='h2'>{username}</p>
        <div className='mt-5'>
          <Button onClick={(e) => this.logout(e)} color='danger' className='mx-2'>
            Logout
            </Button>
          <Button onClick={(e) => this.props.getEdit(e)} color='warning' className='mx-2'>
            Edit Profile
            </Button>
        </div>
      </>
    )
  }
}