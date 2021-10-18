import { useEffect, useState, useCallback } from 'react'

function NetworkRequest(method,url, path, body, mode = 'cors'){
  return fetch(url+path,{
    method,
    body,
    headers: {
      "Content-Type": "application/json"
    },
    mode
  })
}

function useNetworkRequest(request, args, type = 'active'){

  const [fetching,setFetching] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null)



  const refetch = useCallback((args, type = 'active') => {
    if(type === 'active') setFetching(true);
    request(args).then((res)=>{
      return res.json()
    }).then((json)=>{
      setData(json);
      if(type === 'active') setFetching(false);
    })
    .catch((error)=>{
      setError(error);
      if(type === 'active') setFetching(false);
    })
  },[args])

  useEffect(()=>{
    refetch(args, type);
  },[args,refetch]);

  return { fetching, data, error, refetch}
}

export {
  NetworkRequest,
  useNetworkRequest
}