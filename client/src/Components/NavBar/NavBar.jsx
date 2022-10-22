import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import s from './NavBar.module.css'
import img from './img/airplane.png'


const NavBar = () => {
  return (
    <nav className={s.nav}>
        <Link to='/Home'>
            <img className={s.icon} src={img} alt="airplane-icon" />  
        </Link>
        <h3 className={s.title}>HENRY COUNTRIES</h3>
        <div className={s.links}>
          <Link className={s.link} to='/create'>
              Create <span className={s.create}> a new activity</span>
          </Link>
        </div>
        <SearchBar />
    </nav>
  )
}

export default NavBar