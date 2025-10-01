import React from 'react'

function Layout({children}) {
  return (
    <div className='flex bg-[#f6f8f8]'>
        {children}
    </div>
  )
}

export default Layout