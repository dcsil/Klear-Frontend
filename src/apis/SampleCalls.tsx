import {domain} from './Headers';


export const helloWorld = async () => {
  try{
    const response = await fetch(domain + "/sampleRouteMiddleName/helloBackend", {
      method: 'GET',
      mode: 'cors'
  });
    const responeJson = await response.json();
    return responeJson.hello
    
  } catch (e) {
    console.log(e) // integrate with Sentry?
  }  
}
