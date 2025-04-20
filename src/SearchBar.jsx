import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from './WeatherContext'
import './App.css'

export const SearchBar = () => {
    const {searchQuery, setSearchQuery, setConfirmedCity, setSuggestion, suggestion, queryData, setErrMsg, errMsg, setSubmitTrigger} = useContext(WeatherContext)
    const [latLonCoord, setLatLonCoord] = useState({latitude: null, longitude: null})
    const x = useContext(WeatherContext)

    // console.log(x)
 
    

    const submitForm = (e) => {
        e.preventDefault()
        // const input = e.target.elements.inputCity.value
        setConfirmedCity(searchQuery)
        setSubmitTrigger(prev => prev + 1)
        setSuggestion([])
        setSearchQuery('')
        
        
    }

    const detectQuery = (e) => {
        const input = e.target.value
        setSearchQuery(input)
        if (errMsg) setErrMsg('')

     }

    // useEffect(() => {
    //     if (queryData) {
    //         // console.log(`Location: ${queryData.name}`)
    //         // console.log(`Temperature: ${queryData.main.temp}`)
    //         console.log(suggestion)
    //     } else {
    //         console.log("queryData or name is undefined")
    //     }
    // }, [queryData])

   const handleUserCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        fetchWeatherByCoords(lat, lon)
        // setLatLonCoord({latitude: lat, longitude: lon})
    },
    (error) => {
        console.error("Geolocation error:", error);
      }
    )
    
    const fetchWeatherByCoords = async (lat, lon) => {
        const apiKey = 'b97575b21c57260bfb787231c7ca4e08'
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            if (!res.ok) throw new Error("Location weather fetch failed");
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
   }
    
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
      
                <button onClick={handleUserCoord}>
                    <i className="fa-solid fa-location-dot"></i>
                </button>  
            </form>
            {errMsg && <p className='errMsg'>{errMsg}</p>}
            
        </>
    )
}
