import React from 'react'
import { Link } from 'react-router-dom'

const Add = (props) => {
    return (
        <Link to={(props.type === "category") ? `addCategory`: `addBook`}
            className='cursor-pointer ml-3 align-middle font-normal text-base text-black'>
            Add +
        </Link>
    )
}

export default Add