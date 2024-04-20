import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
      fetch(url)
      .then(response => {
        if (!response.status === "ok") { 
          // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return response.json();
      })
      .then(res => {
        //console.log(res);
        setIsLoading(false);
        setData(res.data);
        setMessage(res.message);
      })
      .catch(err => {
        setIsLoading(false);
        setMessage(err.message);
      })
  }, [url])

  return { data, isLoading, message };
}

export default useFetch;