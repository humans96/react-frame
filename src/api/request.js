const API_VERSION = 'wechat-advertise-api';

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const PUT = 'PUT';

const formatParams = data => {
  // remove keys point to undefined value
  const keys = Object.keys(data).filter(key => undefined !== data[key]);
  if(keys.length) {
    return '?' + keys.map(key => `${key}=${data[key]}`).join('&');
  }else {
    return '';
  }
};

const headers = {
  'Content-Type': 'application/json'
};

export default (url, method = GET) => {
  return (data, ...appendToUrl) => {
    if(method === GET && data) { // convert object to url parameters & append to extra urls
      appendToUrl.push(formatParams(data));
    }

    if(window.token) {
      headers.token = window.token;
    }
    return new Promise((f, r) => {
      fetch(`/${API_VERSION}${url}${appendToUrl.join('')}`, {
        method,
        body: method === GET ? undefined : JSON.stringify(data),
        headers
      }).then(res => {
        if(res.ok) {
          return res.json();
        }else {
          throw new Error(res);
        }
      }).then(res => {
        f(res);
      }).catch(res => {
        f(res);
      }).then(() => {
        f();
      });
    });
  };
};

export {
  GET,
  POST,
  DELETE,
  UPDATE,
  PUT,
  formatParams,
  API_VERSION
};
