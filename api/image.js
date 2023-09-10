import { googletoken } from "../constanst";
import axios from "axios";

const imageFunder = params => `https://serpapi.com/search.json?q=${params.title}&engine=google_images&ijn=0&api_key=${googletoken}`

const getdata = async(endpoint)=>{
    const options ={
        method: 'GET',
        url: endpoint
    }
    try{
        const response = await axios.request(options)
        if(!response.data) throw new Error('failed to load IMG data')
        return response.data;
    }catch(err){
        console.log('error',err)
        return null
    }
}

export const searchImage = (params)=>{
    return getdata(imageFunder(params))
}

