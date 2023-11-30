import React from 'react';
import '../styles/components/button.css';

const AuthButton = ({children, onClick, type}) => {
  return (
    <button className='main-authbutton' onClick={onClick}>
        {children}
    </button>
  )
}

export default AuthButton