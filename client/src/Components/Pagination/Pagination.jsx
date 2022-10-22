import React from 'react'
import next from './img/next.png'
import back from './img/back.png'
import s from './Pagination.module.css'


const Pagination = ({page, setPage, max}) => {
    
    const nextPage = ()=>{
        page ===max?setPage(page = 1):setPage(page + 1)
    }

    const previousPage =()=>{
        page === 1? setPage(page = max):setPage(page-1)
    }
  return (
    <div className={s.pagination}>
        <button className={s.button} onClick={previousPage}><img className={s.image} src={back} alt="back" /></button>
        <span>Page {page} of {max}</span>
        <button className={s.button} onClick={nextPage}><img className={s.image} src={next} alt="next" /></button>
    </div>
  )
}

export default Pagination