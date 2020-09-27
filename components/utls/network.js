import React from "react";
import axios from "axios";
import getConfig from "next/config";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
const { publicRuntimeConfig } = getConfig();

const NETWORK = axios.create({
  baseURL: publicRuntimeConfig.API_URL,
  // withCredentials: true,

});

NETWORK.interceptors.request.use(function (config) {
  
  if(config.url !== 'https://restcountries.eu/rest/v2/all?fields=name;flag;currencies;alpha3Code'){
    const SECRET = publicRuntimeConfig.SECRET_KEY;
    let body = JSON.parse(config.data);
    body = JSON.stringify(body);
    let hmacDigest = Base64.stringify(hmacSHA512(body, SECRET));

    config.headers['client-id'] =`${publicRuntimeConfig.CLIENT_ID}`;
    config.headers.signature =hmacDigest;
    config.headers['Content-Type']= 'application/json';
  }

  return config;
});

NETWORK.interceptors.response.use(
  function(response) {

    return response;
  },
  function(error) {
    try {
      let match = Object.keys(apiList()).filter(function(a) {
        return error.config.url.indexOf(a) !== -1;
      });

      if (match.length > 0) {
        console.log(error);
      }
      if (error.response.status === 500) {
        //REDIRECT.RouteTo404()
      }
    } catch (error) { }

    // return Promise.reject(error);
  }
);

export default NETWORK;
