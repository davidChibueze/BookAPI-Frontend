import React from 'react'
import { Link } from 'react-router-dom'
import Add from './Add/Add'
import "./header.css"

const Header = () => {
  return (
    <div className='title font-bold text-2xl leading-10 text-normal-blue grid grid-cols-2 mb-3'>
      <h2 className='cursor-pointer'><Link to={`categories`}>Category</Link> <Add type="category"/> </h2>
      <h2 className='cursor-pointer'><Link to={`books`}>Books</Link> <Add type="book"/> </h2>
    </div>
  )
}

export default Header