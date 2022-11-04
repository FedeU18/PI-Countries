import React,{ useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCountryDetail,clear} from '../../Redux/actions'
import s from './Detail.module.css'
import NavBar from '../NavBar/NavBar'

const Detail = (props) => {
  const id = props.match.params.id
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getCountryDetail(id))
    return ()=> dispatch(clear())
  },[dispatch,id])

  const detail = useSelector(state=>state.detail)


  return (
    <div>
      <NavBar />
      <div className={s.all}>
        {
          Object.keys(detail).length !== 0 &&
          <div className={s.detail}>
            <h1>{detail.name}</h1>
            <img className={s.flag} src={detail.flag} alt={detail.code} />
            <div className={s.info}>
              <span className={s.masInfo}>
                <p>Code: {detail.code}</p>
                <p>Continent: {detail.continent}</p>
                <p>Subregion: {detail.subregion}</p>
              </span>
              <span className={s.masInfo}>
                <p>Capital: {detail.capital}</p>
                <p>Area: {detail.area} km<sup>2</sup></p>
                <p>Population: {detail.population}</p>
              </span>
            </div>
            {
            detail.activities.length ? <div>
              <p className={s.tourist}>
              Tourist activities:
              </p>
              <div className={s.container}>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <td>Activity</td>
                      <td>Diff<span className={s.text}>iculty</span></td>
                      <td>Duration</td>
                      <td>Season</td>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      detail.activities?.map((a)=>{
                        return(
                          <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.difficulty}</td>
                            <td>{a.duration}</td>
                            <td>{a.season}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>:<></>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Detail