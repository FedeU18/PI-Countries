import React from 'react'
import {Link} from 'react-router-dom'
import s from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div className={s.inicio}>
        <h1 className={s.title}>
          <Link className={s.link} to='/home'>  ¡Let's travel around the world!  </Link>
        </h1>
    </div>
  )
}

export default LandingPage