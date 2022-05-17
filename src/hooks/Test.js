import { useEffect } from "react";

const useTest= ()=>{
    console.log('test hook');
    useEffect(()=>{
        console.log('useeffect test');
    }, [])
}

export default useTest;