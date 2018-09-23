'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();

let newItem = {
  TableName: tableName,
  Item: {
    year: 2015,
    title: 'The Big New Movie',
    actors: ['me', 'you'],
    info: {
      plot: 'Nothing happens at all....',
      rating: 0
    }
  },
  ReturnConsumedCapacity: 'TOTAL'
};

print('Adding new item...');

docClient
  .put(newItem)
  .promise()
  .then(prettyPrint)
  .catch(print);
