import React, {useState, createContext, useEffect} from 'react'

export const WeatherContext = createContext()

export const WeatherProvider = ({children}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [queryData, setQueryData] = useState(null)
    const [lonLatData, setLonLatData] = useState(null)
    // const [inputSuggestion, setInputSuggestion] = useState({lon: null, lat: null})
    const [suggestion, setSuggestion] = useState([])
    const [confirmedCity, setConfirmedCity] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [submitTrigger, setSubmitTrigger] = useState(0);
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
                setErrMsg("City not found. Please try again.")
                setSearchQuery([])
                return

            }
        }
        getQuery()
    }, [confirmedCity, submitTrigger])

    useEffect( () => {
        const getLocationSuggestions = async () => {
            if (!searchQuery || errMsg) return
            try {
            const suggestionRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=5&appid=${apiKey}`)
            const suggestionData = await suggestionRes.json()
            setSuggestion(suggestionData)
            // console.log(suggestionData)
            
            } catch (error) {
                console.log('Error fetching input suggestion: ', error )
            }
        }
        // const timer = setTimeout(getLocationSuggestions, 5000)
        // return clearTimeout(timer)
        getLocationSuggestions()
    }, [searchQuery])

    
    
    
  return (
    <WeatherContext.Provider value={{

        searchQuery, 
        setSearchQuery,

        lonLatData, 
        setLonLatData,
        
        queryData, 
        setQueryData, 

        // inputSuggestion, 
        // setInputSuggestion,
        
        suggestion, setSuggestion,

        confirmedCity, setConfirmedCity,
        errMsg, setErrMsg,
        submitTrigger, setSubmitTrigger
        }}>
        {children}
    </WeatherContext.Provider>
  )
}
