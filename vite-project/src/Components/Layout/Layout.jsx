import React from 'react'
import Navbar from '../NavBar/Navbar'
import "./Layout.css"

const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <main className='bg-gray-100 main-content'>
        {children}
      </main>
    </div>
  )
}

export default Layout
