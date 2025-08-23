import React from 'react'

function FooterComponent() {
  return (
    <div>
      <footer className='fixed-bottom'>
        <nav className="navbar navbar-expand-lg navbar-glass">
          <div className="container-fluid">
            <span className="navbar-text text-white text-center w-100">
            Clinic Management System developed by Kevin Zhang &copy; {new Date().getFullYear()} 
            </span>
          </div>
        </nav>
        
      </footer>
    </div>
  )
}

export default FooterComponent
