import React from 'react'
import Home from './home'
import Header from '../components/layout/Header'
import MenuWrapper from '../components/product/MenuWrapper'
import About from '../components/About'
const Index = () => {
  return (
    <div>
      <Header />
      <Home/>
      <MenuWrapper/>
      <About />
    </div>
  )
}

export default Index