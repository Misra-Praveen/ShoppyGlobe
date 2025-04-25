import { useEffect, useState } from "react";

function useFetchProducts(url){

    const[data, setData]=useState(null);
    const[error, setError]=useState(null);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            }
            catch(err){
                setError(err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData()
    },[url])
    return { loading, error, data };

}
export default useFetchProducts;