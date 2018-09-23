'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();

// for example usage of GET API
/*
    - this query is looking for a movie released in '2015' with title 'The Big New Movie'
*/
let compositeKeys = {
  TableName: tableName,
  ProjectionExpression: '#yr, title, info',
  ExpressionAttributeNames: {
    '#yr': 'year' //because year is reserved keyword, must specify in this style
  },
  Key: {
    year: 2015,
    title: 'The Big New Movie'
  }
};

print(
  '=========== Getting item using composite primary keys ==================='
);
docClient
  .get(compositeKeys) //for get MUST SPECIFY all the primary keys
  .promise()
  .then(prettyPrint)
  .catch(print);
