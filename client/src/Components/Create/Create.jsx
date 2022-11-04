import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createActivity, getCountries } from '../../Redux/actions'
import NavBar from '../NavBar/NavBar'
import s from './Create.module.css'

function validate(input){
  let errors = {}
  if(!input.name){
    errors.name = "A name for the activity is required"
  }
  if(input.name.length > 10){
    errors.name = "The name must not be longer than 10 characters"
  }
  if(input.name && !/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(input.name)){
    errors.name = "The name must not contain numbers or symbols"
  }
  if(input.difficulty >5 && input.difficulty <1){
    errors.difficulty = "The difficulty cannot be less than 1 or more than 5"
  }

  return errors
}

const Create = () => {
  const dispatch = useDispatch()
  const countries = useSelector(state=> state.countries)
  const history = useHistory()

  useEffect(()=>{
    dispatch(getCountries())
  },[dispatch])

  const [input,setInput] = useState({
    name: '',
    difficulty: 0,
    duration: '',
    season: '',
    countries: []
  })

  const [error, setError] = useState({})

  function disabled(input){
    if(input.name.length && input.difficulty<=5 && input.difficulty>=1 && input.duration.length && input.season.length &&input.countries.length){
      return false
    }
    return true
  }

  function handleOnChange(e){
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSeasonButton(e){
    setInput({
      ...input,
      season: input.season === e.target.value?
      '':
      e.target.value
    })
  }

  function handleDifficultyButton(e){
    setInput({
      ...input,
      difficulty: input.difficulty === Number(e.target.value) ?
      0:
      Number(e.target.value)
    })
    setError(validate({
      ...input,
      difficulty: e.target.value
    }))
  }

  function handleSelect(e){
    setInput({
      ...input,
      countries: e.target.value !== "default"? [...input.countries, e.target.value]:[...input.countries] 
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(createActivity(input))
    alert("¡Activity successfully created!")
    setInput({
      name: '',
      difficulty: 0,
      duration: '',
      season: '',
      countries: []
    })
    history.push('/home')
  }

  function handleClose(e){
    setInput({
      ...input,
      countries: input.countries.filter((c)=> c !== e.target.value)
    })
  }

  return (
    <div>
      <NavBar />
      <div className={s.all}>
        <div className={s.titleAndForm}>
          <h1 className={s.title}>¡Create a tourist activity!</h1>
          <form>
            <div className={s.form__group }>
              <input 
                type="input" 
                className={s.form__field} 
                value={input.name} 
                placeholder="Name" 
                name="name" 
                required 
                onChange={(e)=>handleOnChange(e)} 
                autoComplete="off"
              />
              <label className={s.form__label}>Name</label>
            </div>
            {error.name && <p className={s.alarm}>{error.name}</p>}
            <div className={s.form__group}>
              <input 
                type="input" 
                className={s.form__field}
                value={input.duration} 
                placeholder="Duration"
                name='duration' 
                required
                onChange={(e)=>handleOnChange(e)} 
                autoComplete="off"
              />
              <label className={s.form__label}>Duration</label>
            </div>
            <div className={s.form__group}>
              <label className={s.buttonLabel}>Difficulty  </label>
              <button className={input.difficulty === 1 ? s.chosen : s.unchosen } type='button' value='1' onClick={(e)=>handleDifficultyButton(e)}>1</button>
              <button className={input.difficulty === 2 ? s.chosen : s.unchosen } type='button' value='2' onClick={(e)=>handleDifficultyButton(e)}>2</button>
              <button className={input.difficulty === 3 ? s.chosen : s.unchosen } type='button' value='3' onClick={(e)=>handleDifficultyButton(e)}>3</button>
              <button className={input.difficulty === 4 ? s.chosen : s.unchosen } type='button' value='4' onClick={(e)=>handleDifficultyButton(e)}>4</button>
              <button className={input.difficulty === 5 ? s.chosen : s.unchosen } type='button' value='5' onClick={(e)=>handleDifficultyButton(e)}>5</button>
            </div>
            {error.difficulty && <p className={s.alarm}>{error.difficulty}</p>}
            <div className={s.form__group}>
              <label className={s.buttonLabel}>Season  </label>
              <button className={input.season === 'Summer' ? s.chosen : s.unchosen} /*disabled={input.season!=="Summer"&& input.season.length!==0 && true}*/ type='button' onClick={(e)=>handleSeasonButton(e)} value='Summer' >Summer</button>
              <button className={input.season === 'Winter' ? s.chosen : s.unchosen} /*disabled={input.season!=="Winter"&& input.season.length!==0 && true}*/ type='button' onClick={(e)=>handleSeasonButton(e)} value='Winter' >Winter</button>
              <button className={input.season === 'Fall' ? s.chosen : s.unchosen} /*disabled={input.season!=="Fall"&& input.season.length!==0 && true}*/ type='button' onClick={(e)=>handleSeasonButton(e)} value='Fall' >Fall</button>
              <button className={input.season === 'Spring' ? s.chosen : s.unchosen} /*disabled={input.season!=="Spring"&& input.season.length!==0 && true}*/ type='button' onClick={(e)=>handleSeasonButton(e)} value='Spring' >Spring</button>
            </div>
            <div>
              <select className={s.select} onChange={(e)=>handleSelect(e)}>
                <option value="default">Choose the countries</option>
                {
                  countries.length && countries.map((country)=>{
                    return(
                      <option key={country.code} value={country.name}>{country.name}</option>
                    )
                  })
                }
              </select>
              <div className={s.countries}>
                {
                  input.countries.length ? input.countries.map((c)=>{
                    return <button type='button' className={s.country} onClick={(e)=> handleClose(e)} key={c} value={c}>{c}</button>
                  }):<></>
                }
              </div>
            </div>
            <button className={s.create} disabled={disabled(input)} type='submit' onClick={(e)=>handleSubmit(e)}>¡Create!</button>
          </form>
        </div>
    </div>
  </div>
  )
}

export default Create