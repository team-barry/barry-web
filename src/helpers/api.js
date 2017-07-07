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

export default function callApi(req) {
  const url = formatUrl(req.endpoint);
  console.log(req);
  return fetch(url, {
    mode: 'cors',
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body)
  }).then((response) => {
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
    }).catch((err)=> {
      console.log(err);
    });
};
