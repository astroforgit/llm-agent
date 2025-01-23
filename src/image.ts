import OpenAI from "openai";
import { getConfig } from "./utils";
import { Provider } from "./types";
import { chatModels } from "./models";
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path'; 
 
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

function ensureDirectoryExists(directory: string): void {
  if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
      console.log(`Directory created: ${directory}`);
  }
}

// Save a Base64 string as a JPEG file
function saveBase64AsJPEG(base64String: string, outputFilePath: string): void {
  try {
      // Extract Base64 content, removing any header (e.g., "data:image/jpeg;base64,")
      const base64Content = base64String.replace(/^data:image\/jpeg;base64,/, '');

      // Convert Base64 string to a Buffer
      const imageBuffer = Buffer.from(base64Content, 'base64');

      // Write the buffer to the file
      fs.writeFileSync(outputFilePath, imageBuffer);

      console.log(`File saved successfully at ${outputFilePath}`);
  } catch (error) {
      console.error('Error saving the image file:', error);
  }
}

function generateRandomString(length: number = 6): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function saveBase64Image(base64Image: string): void {

  const imagesDir: string = path.join(__dirname, 'images'); // Path to the 'images' directory
  const randomFileName: string = `${generateRandomString()}.jpeg`;
  const outputFilePath: string = path.join(imagesDir, randomFileName); // Output file path
  
  // Ensure the 'images' directory exists
  ensureDirectoryExists(imagesDir);

  // Save the Base64 image as a JPEG file
  saveBase64AsJPEG(base64Image, outputFilePath);
}


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
        debugger;
        const response = await fetch(configobj.baseURL+"/images/generations", requestoptions);

        // Handle response status
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        // Parse the JSON response
        const data = await response.json();
        console.log('Image Generation Response:', data);
        saveBase64Image(data.data[0].b64_json);
        return data.data[0].b64_json;  
        // Process the data as needed
    } catch (error) {
        console.error('Error making request:', error);
    }
}


 