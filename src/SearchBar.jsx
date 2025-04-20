import React, { useContext, useEffect } from 'react'
import { WeatherContext } from './WeatherContext'
import './App.css'

export const SearchBar = () => {
    const {searchQuery, setSearchQuery, setConfirmedCity, setSuggestion, suggestion, queryData, setErrMsg, errMsg, setSubmitTrigger} = useContext(WeatherContext)
    const x = useContext(WeatherContext)

    // console.log(x)
 
    

    const submitForm = (e) => {
        e.preventDefault()
        // const input = e.target.elements.inputCity.value
        setConfirmedCity(searchQuery)
        setSubmitTrigger(prev => prev + 1)
        setSearchQuery('')
        
        
    }

    const detectQuery = (e) => {
        const input = e.target.value
        setSearchQuery(input)
        if (errMsg) setErrMsg('')

     }

    useEffect(() => {
        if (queryData) {
            // console.log(`Location: ${queryData.name}`)
            // console.log(`Temperature: ${queryData.main.temp}`)
            console.log(suggestion)
        } else {
            console.log("queryData or name is undefined")
        }
    }, [queryData])
    
    return (
        <>
            <form  className='form-input' onSubmit={(e) => submitForm(e)}>
                
                <input 
                    type="text" 
                    name='inputCity' 
                    placeholder='City Name' 
                    value={searchQuery} 
                    onChange={detectQuery}
                    />
                
                <button type='submit'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
      
                <button>
                    <i className="fa-solid fa-location-dot"></i>
                </button>  
            </form>
            {errMsg && <p className='errMsg'>{errMsg}</p>}
            
        </>
    )
}
