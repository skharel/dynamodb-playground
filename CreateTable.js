'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let db = new AWS.DynamoDB();

let tableDefn = {
  TableName: tableName,
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' }, //Partition key
    { AttributeName: 'title', KeyType: 'RANGE' } //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'title', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

db.createTable(tableDefn)
  .promise()
  .then(prettyPrint)
  .catch(print);
