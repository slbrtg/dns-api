const Route53 = require('aws-sdk/clients/route53');
const Moment = require('moment');
const Promise = require('promise');

const route53 = new Route53({apiVersion: '2013-04-01'});


function getHostedZoneCount() {
  const params = {};
  route53.getHostedZoneCount(params, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data);
  });
}

function getHostedZoneId(zoneName) {
  return new Promise(async (resolve, reject) => {
    const params = { DNSName: zoneName };
    await route53.listHostedZonesByName(params, (err, data) => {
      if(err) {
        reject(err, err.stack)
      } else {
        resolve(data.HostedZones[0].Id);
      }
    });
  });
}

function utcTimestamp() {
  const utcMoment = Moment.utc();
  const currentUtc = new Date(utcMoment.format()).toUTCString();
  return currentUtc;
}

function createSimpleHostedZone(zoneName) {
  const params = {
    Name: zoneName,
    CallerReference: utcTimestamp()
  }
  route53.createHostedZone(params, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data);
  });
}


async function deleteHostedZone(zoneName) {
  const zoneId = await getHostedZoneId(zoneName)
  const params = { Id: zoneId }
  route53.deleteHostedZone(params, (err, data) => {
    err ? console.log(err, err.stack) : console.log(data);
  })
}
