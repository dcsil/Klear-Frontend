import {domain} from './Headers';
import * as Sentry from 'sentry-expo';

export const helloWorld = async () => {
  try{
    const response = await fetch(domain + "/sampleRouteMiddleName/helloBackend", {
      method: 'GET',
      mode: 'cors'
  });
    const responeJson = await response.json();
    return responeJson.hello
    
  } catch (e) {
    Sentry.Native.captureException(e);
  }  
}
