import fetch from 'isomorphic-fetch';

const server = {
  host: process.env.REACT_APP_SERVER_HOST,
  port: process.env.REACT_APP_SERVER_PORT,
  ver: process.env.REACT_APP_SERVER_VER
};

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'http://' + server.host + ':' + server.port + '/' + server.ver + adjustedPath;
}

function makeHeaders(method) {
  return {
    mode: 'cors',
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  }
}

function makeAuthHeaders(method, auth) {
  const authorization = `${auth.access_token}`
  return {
    mode: 'cors',
    method: method,
    headers: {
      'Authorization': authorization,
      'Content-Type': 'application/json',
    }
  }
}

function fetchAPI(url, request) {
  return fetch(url, request)
    .then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      if(data.error) {
        throw Error(data.error);
      }
      return data;
    });
};


// API class request following json format
// params {
//   endpoint: string of your api's endpoint,
//   body: json objects of your request,
//   auth: string of auth token if you want to authorization api method
// }
export default class API {
  static get(params) {
    const url = formatUrl(params.endpoint);
    const request = {
      ...makeHeaders('GET'),
    }
    return fetchAPI(url, request);
  };
  
  static post(params) {
    const url = formatUrl(params.endpoint);
    const request = {
      ...makeHeaders('POST'),
      body: JSON.stringify(params.body)
    }
    return fetchAPI(url, request);
  };
  
  static getWithAuth(params) {
    const url = formatUrl(params.endpoint);
    const request = {
      ...makeAuthHeaders('GET', params.auth)
    }
    console.log("request", request);
    return fetchAPI(url, request);
  }
  
  static postWithAuth(params) {
    const url = formatUrl(params.endpoint);
    const request = {
      ...makeAuthHeaders('GET', params.auth),
      body: JSON.stringify(params.body)
    }
    return fetchAPI(url, request);
  }
};
