import React, { Component } from 'react'
import { TailSpin } from  'react-loader-spinner'

export default class Loader extends Component {
  render() {
    return (
        <div className='wrap'><TailSpin color="blue"/></div>
    )
  }
}