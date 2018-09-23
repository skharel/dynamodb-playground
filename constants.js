'use strict';

let AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

module.exports = {
  tableName: 'test.Movies',
  AWS: AWS,
  print: console.log,
  prettyPrint: json => console.log(JSON.stringify(json, null, 2))
};
