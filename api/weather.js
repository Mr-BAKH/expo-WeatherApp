import axios from 'axios';
import { apiKey } from '../constanst';

const locationsEndpoint = params => `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${params.cityName}?key=${apiKey}`

const GETAPI = async(endpoint)=>{
    const options ={
        method: 'GET',
        url: endpoint
    } 
    try{
        const response = await axios.request(options)
        return response.data;
    }catch(err){
        console.log('error',err)
        return null
    }
}

export const fetchLocations = (params) =>{
    return GETAPI(locationsEndpoint(params))
}
