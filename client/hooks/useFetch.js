import { useState, useEffect } from "react";

const useFetch = (url, opts={method:'GET'}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState(false)
  
  const fetchData = async () => {
    try {
      setLoading(true)
      // console.log(`useFetch.fetch('${url}')`, opts)
      const response = await fetch(url, opts)
      const json = await response.json()
      setData(json)
    } catch (e){
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(url)
  },

  [url])

  return {
    isLoading: !!loading,
    isError: !!error,
    isSuccess: !error,
    data,
    error
  }
}

export default useFetch