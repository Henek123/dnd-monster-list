import React from 'react'
import './styles/LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className='loading-screen'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  )
}
