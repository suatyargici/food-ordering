import React from 'react'
import Home from './home'
import Header from '../components/layout/Header'
import MenuWrapper from '../components/product/MenuWrapper'
import About from '../components/About'
import Reservation from '../components/Reservation'
import Customers from '../components/customers/Customers'
import Footer from '../components/layout/Footer'
const Index = () => {
  return (
    <div>
      <Header />
      <Home/>
      <MenuWrapper/>
      <About />
      <Reservation/>
      <Customers/>
      <Footer />
    </div>
  )
}

export default Index