import {
    GET_COUNTRIES, 
    GET_ACTIVITIES, 
    SORT_ALPHABETICALLY,
    SORT_BY_POPULATION,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    GET_COUNTRY_BY_NAME,
    GET_COUNTRY_DETAIL,
    CLEAR
} from '../actions'

const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    detail: {}
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            };

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            };
        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAR:
            return {
                ...state,
                detail: {}
            }
        case SORT_ALPHABETICALLY:
            const countries = [...state.allCountries]
            const sortedCountries = action.payload === 'default' ? countries : action.payload === 'ASC' ?
            countries.sort((a,b)=>{
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0
            }):
            countries.sort((a,b)=>{
                if(a.name < b.name){
                    return 1
                }
                if(b.name < a.name){
                    return -1
                }
                return 0
            })
            return {
                ...state,
                countries: sortedCountries
            };

        case SORT_BY_POPULATION:
            const countries2 = [...state.allCountries]
            const sortCountries = action.payload === 'default'? countries2: action.payload === 'most' ?
            countries2.sort((a,b)=>{
                return b.population-a.population
            }):
            countries2.sort((a,b)=>{
                return a.population-b.population
            })
            return {
                ...state,
                countries: sortCountries
            };

        case FILTER_BY_CONTINENT:
            const countries3 = [...state.allCountries]
            const filteredByContinent = action.payload === "default" ? countries3 :
            countries3.filter((c)=> c.continent === action.payload)
            return {
                ...state,
                countries: filteredByContinent
            };

        case FILTER_BY_ACTIVITY:
            const countries4 = [...state.allCountries]
            const onlyCountriesWithActivities = countries4.filter((country)=> {
                return country.activities.length>0
            })

            let countriesFiltered = []
            
            onlyCountriesWithActivities.forEach((country)=>{
                country.activities.forEach((activity)=>{
                    if(activity.name === action.payload){
                        countriesFiltered.push(country)
                    }
                })
            })

            const filter = action.payload === "default" ? countries4: countriesFiltered

            return {
                ...state,
                countries: filter
            }

        default:
            return {...state};
    }
}