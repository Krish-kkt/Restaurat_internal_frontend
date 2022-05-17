import { useEffect, useState } from "react";
import BASE_URL from "../BASE_URL";

const useInitialRequest= (url, method, data)=>{
    const [resStatus, setResStatus]= useState(null);
    const [response, setResponse]= useState(null);
    
    useEffect(async()=>{
        url= `${BASE_URL}${url}`;
        let options={credentials: 'include'};
        if (method){
            options= {
                method,
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }

        }
        try{
            let RES= await fetch(url,options);
            setResStatus(RES.status);
            RES= await RES.json();
            setResponse(RES);
        }catch(e){
            console.log(e);
            setResponse({Error: 'Server down! Try after some time.'});
        }

    },[])

    return [resStatus, response];
    
}

export default useInitialRequest;