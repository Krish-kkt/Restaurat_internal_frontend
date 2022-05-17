import BASE_URL from "../BASE_URL";

const fetchRequest= async (url, method, data)=>{
    let resStatus=null;
    let response;
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
        resStatus=RES.status;
        RES= await RES.json();
        response= RES;
    }catch(e){
        response={Error: 'Server down! Try after some time.'};
    }

    return [resStatus, response];
}

export default fetchRequest;