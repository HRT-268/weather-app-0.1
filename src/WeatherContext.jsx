import React, {useState, createContext, useEffect} from 'react'

export const WeatherContext = createContext()

export const WeatherProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [queryData, setQueryData] = useState(null)
    const [lonLatData, setLonLatData] = useState(null)
    const [inputSuggestion, setInputSuggestion] = useState({lon: null, lat: null})
    const [suggestion, setSugestion] = useState(null)
    const [confirmedCity, setConfirmedCity] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const apiKey = 'b97575b21c57260bfb787231c7ca4e08'

    useEffect(() => {
        const getQuery = async () => {
            if (!confirmedCity) return
            try { 
                const queryRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${confirmedCity}&appid=${apiKey}&units=metric`)
                
                if (!queryRes.ok) {
                    throw new Error(`HTTP error! Status: ${queryRes.status}`)
                }
                const queryInputData = await queryRes.json()

                setQueryData(queryInputData)
                console.log(queryInputData)

            } catch (error) {
                console.log('Error Fetching query Data:', error)
                setErrMsg("Invalid Location name")
            }
        }
        getQuery()
    }, [confirmedCity])

    useEffect( () => {
        const getLocationSuggestions = async () => {
            if (!searchQuery) return
            try {
            const suggestionRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`)
            const suggestionData = await suggestionRes.json()
            setSugestion(suggestionData)
            console.log(suggestionData)
            
            } catch (error) {
                console.log('Error fetching input suggestion: ', error )
            }
        }
        // const timer = setTimeout(getLocationSuggestions, 5000)
        // return clearTimeout(timer)
        getLocationSuggestions()
    }, [searchQuery])


    useEffect(() => {
        const getLonLat = async () => {
            try {
            if (!inputSuggestion.lat || !inputSuggestion.lon) return
                const lonLatRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${inputSuggestion.lat}&lon=${inputSuggestion.lon}&appid=${apiKey}&units=metric`)
                const lonLatData = await lonLatRes.json()
                setLonLatData(lonLatData)
            } catch (error) {
                console.log('Error fetching Weather Data:', error)
            }
        }
        getLonLat()
    }, [inputSuggestion.lon, inputSuggestion.lat])


    
    
    
  return (
    <WeatherContext.Provider value={{

        searchQuery, 
        setSearchQuery,

        lonLatData, 
        setLonLatData,
        
        queryData, 
        setQueryData, 

        inputSuggestion, 
        setInputSuggestion,
        
        suggestion, setSugestion,

        confirmedCity, setConfirmedCity
        }}>
        {children}
    </WeatherContext.Provider>
  )
}
