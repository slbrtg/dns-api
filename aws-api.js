const Route53 = require('aws-sdk/clients/route53');
const moment = require('moment');

const route53 = new Route53({apiVersion: '2013-04-01'});


function getHostedZoneCount() {
  const params = {};
  route53.getHostedZoneCount(params, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data);
  });
}

function createSimpleHostedZone(zoneName) {
    // Get UTC TIME FOR CALLER REFERENCE
  const utcMoment = moment.utc();
  const currentUtc = new Date(utcMoment.format()).toUTCString();
  const params = {
    Name: zoneName,
    CallerReference: currentUtc
  }

  route53.createHostedZone(params, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data);
  });
}

createSimpleHostedZone('example4.com')


