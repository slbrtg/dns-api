const Route53 = require('aws-sdk/clients/route53');
const constants = require('./aws-constants.js');

const route53 = new Route53({apiVersion: '2013-04-01'});
let params = {};
route53.getHostedZoneCount(params, (err, data) => {
  err ? console.log(err, err.stack) : console.log(data);
});
