// IMPORTS
require('es6-promise').polyfill();

const axios = require('axios');
const jssha = require('jssha');
const moment = require('moment');
const constants = require('./dme-constants');

// Get UTC TIME
const utcMoment = moment.utc();
const requestDate = new Date(utcMoment.format()).toUTCString();

// GET HMAC
jsSHA = new jssha("SHA-1", "TEXT");
jsSHA.setHMACKey(constants.SECRET_KEY, "TEXT");
jsSHA.update(requestDate, "TEXT");
const hmac = jsSHA.getHMAC("HEX");

// GET ALL ZONES
axios.get(constants.API_URL + 'dns/managed', {
  headers: {
    'Content-Type': 'application/json',
    'x-dnsme-apiKey': constants.API_KEY,
    'x-dnsme-hmac': hmac,
    'x-dnsme-requestDate': requestDate
  }
}).then(function (response) {
  console.log(response);
})