import React from 'react'
import s from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={s.notFound}>
        <Link to="/home">
            <img src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Not-Found-img" className={s.image} />
        </Link>
    </div>
  )
}

export default NotFound