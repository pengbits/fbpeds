import { useState, useEffect } from "react";

const useFetch = (url, opts={method:'GET'}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [error, setError] = useState(false)

  const fetchData = async () => {
    try {
       if(['PUT','POST'].includes(opts.method) && !opts.body){
        throw new Error(`method ${opts.method} assumes a body, but none was found`)
      } 
      opts.headers =  {"Content-Type": "application/json"}
      setLoading(true)
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
    url && fetchData(url)
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