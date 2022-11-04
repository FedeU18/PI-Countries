import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getCountries,getActivities,sortAlphabetically, sortByPopulation, filterByContinent, filterByActivity} from '../../Redux/actions'
import s from './Home.module.css'
import Pagination from '../Pagination/Pagination'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

const Home = () => {
  //listado de paises
  const dispatch = useDispatch()
  const countries = useSelector(state=> state.countries)
  const activities = useSelector(state=>state.activities)
  useEffect(()=>{
    dispatch(getCountries())
    dispatch(getActivities())
  },[dispatch])

  //paginado
  const [page,setPage] = useState(1);
  let perPage = 10;
  const max = Math.ceil(countries.length / perPage)
  const countriesPerPage = countries.slice((page-1)*perPage,(page-1)*perPage +perPage) 

  //Sort alphabetically
  function handleSortAlphabetically(e){
    setPage(1)
    dispatch(sortAlphabetically(e.target.value))
  }
  //Sort by population
  function handleSortPopulation(e){
    setPage(1)
    dispatch(sortByPopulation(e.target.value))
  }
  //Filter by continent
  function handleFilterContinent(e){
    setPage(1)
    dispatch(filterByContinent(e.target.value))
  }
  //Filter by activity
  function handleFilterActivity(e){
    setPage(1)
    dispatch(filterByActivity(e.target.value))
  }
  //reload countries
  function handleReload(e){
    dispatch(getCountries())
  }

  return (
    <div className={s.contenedor}>
      <NavBar setPage={setPage}/>
      <div className={s.all}>
        <div className={s.selects}>
          <span>
            <select className={s.select} onChange={(e)=> handleSortAlphabetically(e)}>
              <option value="default">Sort</option>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
          </span>
          <select className={s.select} onChange={(e)=> handleSortPopulation(e)}>
            <option value="default">Population</option>
            <option value="most">Most populated</option>
            <option value="less">Less Populated</option>
          </select>
          <span>
            <select className={s.select} onChange={(e)=> handleFilterActivity(e)}>
              <option value="default">Activity</option>
              {activities !== "There are no activities" && activities?.map(a=>{
                return(
                  <option key={a.name} value={a.name}>{a.name}</option>
                )
              })}
            </select>
          </span>
          <span>
            <select className={s.select} onChange={(e)=>handleFilterContinent(e)}>
              <option value="default">Continent</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </span>
          <span>
            <button onClick={(e)=>handleReload(e)}>Reload Countries</button>
          </span>
        </div>
        <div className={s.pagination}>
          <Pagination page={page} setPage={setPage} max={max}/>
        </div>
        {
        countriesPerPage.length?
        <div className={s.container}>

          <table className={s.table}>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name <span className={s.hidden}>(Click on the name to see the detail)</span></th>
                <th>Continent</th>
              </tr>
            </thead>
            <tbody>
              {
                countriesPerPage?.map(c=>{
                  return (
                    <tr key={c.code}>
                      <td>
                        <img src={c.flag} alt={c.code} className={s.flag}/>
                      </td>
                      <td>
                        <Link className={s.link} to={`/home/${c.code}`}>
                          {c.name}
                        </Link>
                      </td>
                      <td className={s.continent}>
                        <p>{c.continent}</p>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
          :
          <div><img src="https://media.giphy.com/media/VX7yEoXAFf8as/giphy.gif" alt="loading-gif" /></div>
        }
      </div>
    </div>
  )
}

export default Home