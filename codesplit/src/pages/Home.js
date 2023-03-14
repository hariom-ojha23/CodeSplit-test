import React from 'react'
import { useNavigate } from 'react-router-dom'
import AppbarComponent from '../components/AppbarComponent'

const Home = () => {
  const navigate = useNavigate()

  function goToJoinRoom() {
    navigate('/joinroom')
  }

  return (
    <div className='homePageContainer'>
      <AppbarComponent />

      <div className='homeMainContainer'>
        <div className='home-title-container'>
          <h1 className='home-title'>Real-time Code Sharing with Developers</h1>
          <h3 className='home-subtitle'>
            An online code editor for studying, teaching, and other purposes...
          </h3>
          <button onClick={goToJoinRoom} className='btn home-join-btn'>
            Share Code for Free
          </button>
        </div>

        <video muted loop autoPlay className='home-video'>
          <source src='/editor-demo.mp4' type='video/mp4' />
          Video tag is not supported in this browser.
        </video>
      </div>

      <footer className='home-footer'>
        <h4 className='home-footer-text'>Made with 💛 by Hari om Ojha</h4>
      </footer>
    </div>
  )
}

export default Home
