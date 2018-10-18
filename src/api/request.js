import { hashHistory } from 'react-router';
import { message } from 'antd';

message.config({
  duration: 2,
  maxCount: 1,
});

let API_VERSION = '/admin-api';
if(process.env.NODE_ENV != "production") {
  API_VERSION = 'http://172.168.1.45:4000/admin-api';
}

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
const PUT = 'PUT';

const formatParams = (data, url) => {
  // remove keys point to undefined value
  let keys = Object.keys(data).filter(key => undefined !== data[key]);
  if(keys.length) {
    keys.map(key => {
      url = url.replace(new RegExp('{'+key+'}','g'), data[key]);
    })
    return url;
  }else {
    return '';
  }
};

const getHeader =()=> {
  return {
    'Content-Type': 'application/json',
    'access_token': $.cookie('token')
  }
}

export default (url, method = GET) => {
  return (data, ...appendToUrl) => {
    let urlParams = null;
    if(method === GET && data) { // convert object to url parameters & append to extra urls
      urlParams = formatParams(data, url);
    }

    if(window.token) {
      headers.token = window.token;
    }
    return new Promise((f, r) => {
      fetch(`${API_VERSION}${ urlParams ? urlParams : url}`, {
        method,
        body: method === GET ? undefined : JSON.stringify(data),
        headers : getHeader()
      }).then(res => {
        if(res.ok) {
          return res.json();
        }else {
          throw new Error(res);
        }
      }).then(res => {
        // if(res.errcode != 0) {
        //   if(res.errcode == 8001 || res.errcode == 8002 || res.errcode == 8003 || res.errcode == 8004) {
        //     $.removeCookie('token');
        //     $.removeCookie('user_name');
        //     $.removeCookie('user_id');
        //     hashHistory.push('/login');
        //   }
        //   if(!url.includes('login') && !url.includes('account/username')) {
        //     message.error(res.errmsg);
        //   }
        // }
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
  // API_VERSION
};
