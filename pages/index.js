import React from 'react'
import Home from './home'
import Header from '../components/layout/Header'
import MenuWrapper from '../components/product/MenuWrapper'
import About from '../components/About'
import Reservation from '../components/Reservation'
const Index = () => {
  return (
    <div>
      <Header />
      <Home/>
      <MenuWrapper/>
      <About />
      <Reservation/>
    </div>
  )
}

export default Index