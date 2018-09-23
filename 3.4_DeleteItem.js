'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();

/*
    In step 3.1 we added new item for the year 2015. For our movie data, there is only one entry for the year 2015. let's update some of the field in this data
*/

let deleteWithCondition = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    ConditionExpression: 'info.rating >= :rating',
    ExpressionAttributeValues: {
      ':rating': 5.0
    }
  },
  usingPrimarykey = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    }
  },
  del = params => {
    docClient
      .delete(params)
      .promise()
      .then(prettyPrint)
      .catch(print);
  };

del(deleteWithCondition);
//del(usingPrimarykey)
