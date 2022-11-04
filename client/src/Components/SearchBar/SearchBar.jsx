import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './SearchBar.module.css'
import { getCountryByName, searchByActivity } from '../../Redux/actions'
import loupe from './img/loupe.png'

const SearchBar = ({setPage}) => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const activities = useSelector(state => state.activities)

  function handleInput(e){
    setInput(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    setPage(1)
    let searchActivities = []
    activities.forEach((activity)=>{
      if(activity.name === input){
        searchActivities.push(activity.name)
      }
    })
    if(searchActivities.includes(input)){
      dispatch(searchByActivity(input))
    }else {
      dispatch(getCountryByName(input))
    }
    setInput("")
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