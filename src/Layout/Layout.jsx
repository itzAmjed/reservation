import React from 'react'
import Navigations from '../component/Navigations.jsx';
import Footer from '../component/Footer.jsx';

export const Layout = ({ children }) => {
  return (
    <>
      <Navigations/>
      {children}
      <Footer />
    </>
  )
}

export default Layout