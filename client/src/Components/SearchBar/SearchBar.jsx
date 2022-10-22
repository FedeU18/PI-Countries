import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import s from './SearchBar.module.css'
import { getCountryByName } from '../../Redux/actions'
import loupe from './img/loupe.png'

const SearchBar = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  function handleInput(e){
    setInput(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getCountryByName(input))
  }

  return (
      <div className={s.searchBar} >
        <input onChange={(e)=>handleInput(e)} type='text' placeholder='Search...'/>
        <button type='submit' onClick={(e)=>handleSubmit(e)}>
          <img className={s.lupa} src={loupe} alt="lupa" />
        </button>
      </div>
  )
}

export default SearchBar