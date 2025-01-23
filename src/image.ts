import OpenAI from "openai";
import { getConfig } from "./utils";
import { Provider } from "./types";
import { chatModels } from "./models";
import fetch from 'node-fetch';
 
 
let configobj:any = {};

// Create the request body
const requestBody = ()=>{
  return{
    model: `${configobj.model}`,
    prompt: `${configobj.prompt}`,
    width: 1024,
    height: 1024,
    steps: 4,
    n: 1,
    response_format: "b64_json",
  }
};

// Create the fetch request options
const requestOptions = ()=>{ 
  return{
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${configobj.apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody())
  }
};

// Make the POST request
export async function createimage(
  prompt: string,
  provider = Provider.OpenAI,
  model?: string
): Promise<any> {
    try {
      let configpart = getConfig(provider);
       configobj = {...configpart,provider,model,prompt}
        let requestoptions:any = requestOptions();
        const response = await fetch(configobj.baseURL+"/images/generations", requestoptions);

        // Handle response status
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        // Parse the JSON response
        const data = await response.json();
        console.log('Image Generation Response:', data);
        return data.data[0].b64_json;  
        // Process the data as needed
    } catch (error) {
        console.error('Error making request:', error);
    }
}


 