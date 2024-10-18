import React from 'react'
import Navbar from '../NavBar/Navbar'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar/>
      <main className='bg-gray-100'>
        {children}
      </main>
    </div>
  )
}

export default Layout
