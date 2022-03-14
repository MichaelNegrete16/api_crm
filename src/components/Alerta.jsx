import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-center my-4 p-3 font-bold bg-red-600 text-white uppercase'>
        {children}
    </div>
  )
}

export default Alerta