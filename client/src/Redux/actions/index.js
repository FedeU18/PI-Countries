import axios from 'axios'

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME'
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY'
export const SORT_BY_POPULATION = 'SORT_BY_POPULATION'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const CLEAR = 'CLEAR'
export const SEARCH_BY_ACTIVITY = "SEARCH_BY_ACTIVITY"

export const getCountries = () =>{
    return async function(dispatch){
        const json = await axios.get('/countries')
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

export const getCountryDetail = (id) => {
    return function(dispatch){
        return axios.get('/countries/' + id)
            .then(response => response.data)
            .then(e=>dispatch({
                type:GET_COUNTRY_DETAIL,
                payload:e
            }))
    }
}

export const clear = () => {
    return {
        type: CLEAR
    }
}

export const createActivity = (payload) => {
    return async function(){
        const post = await axios.post('/activities', payload)
        return post
    }
}

export const getCountryByName = (name)=>{
    return async function (dispatch){
        const json = await axios.get('/countries?name=' + name)
        return dispatch({
            type: GET_COUNTRY_BY_NAME,
            payload: json.data
        })
    }
}

export const getActivities = () =>{
    return async function(dispatch){
        const json = await axios.get('/activities')
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data
        })
    }
}

export const sortAlphabetically = (payload)=>{
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}

export const sortByPopulation=(payload)=>{
    return {
        type:SORT_BY_POPULATION,
        payload
    }
}

export const filterByContinent=(payload)=>{
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export const filterByActivity = (payload)=>{
    return {
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export const searchByActivity = (payload) =>{
    return {
        type: SEARCH_BY_ACTIVITY,
        payload
    }
}