import React from 'react'
import './Loader.css'
import List from './../../pages/List/List';

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  )
}

export default Loader