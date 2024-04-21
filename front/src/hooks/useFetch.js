import { useState, useEffect } from 'react';

export const useFetchType = (type, url) => {
  const [data, setData] = useState({});

  useEffect(() => {
    let isSubscribed = true;
  
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await fetch(url);
      // convert the data to json
      const json = await data.json();
  
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        //console.log("json", json)
        setData({[type]: {
          "data": json.data,
          "message": json.message,
        }});
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  
    // cancel any future `setData`
    return () => isSubscribed = false;
  }, [type, url]);

  let result = null; 
  let message = "";

  if (type in data) {
    //console.log("data",data, data.valueOf(type))
    result = data[type].data;
    message = data[type].message;
  }

  return {result, message};
}


//export default useFetch, useFetchType;