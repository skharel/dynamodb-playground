'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();

/*
    In step 3.1 we added new item for the year 2015. For our movie data, there is only one entry for the year 2015. let's update some of the field in this data
*/

//update top level array of string
let actors = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'set actors=:actors',
    ExpressionAttributeValues: {
      ':actors': ['me', 'the rock']
    },
    ReturnValues: 'UPDATED_NEW'
  },
  //update nested rating object
  rating = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'set info.rating = :newRating',
    ExpressionAttributeValues: {
      ':newRating': 3
    },
    ReturnValues: 'UPDATED_NEW'
  },
  conditionalUpdate = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'set info.rating = :newRating',
    ConditionExpression: 'info.rating <= :lowRating',
    ExpressionAttributeValues: {
      ':newRating': 10,
      ':lowRating': 4
    },
    ReturnValues: 'UPDATED_NEW'
  },
  //add new attribute
  addNewAttribute = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'set newAttribute = :value',
    ExpressionAttributeValues: {
      ':value': 'newValue'
    },
    ReturnValues: 'UPDATED_NEW'
  },
  //remove attribute
  removeAttribute = {
    TableName: tableName,
    Key: {
      year: 2015,
      title: 'The Big New Movie'
    },
    UpdateExpression: 'REMOVE newAttribute',
    ReturnValues: 'UPDATED_NEW'
  },
  update = params => {
    print('=========== Updating item ===================');
    docClient
      .update(params)
      .promise()
      .then(prettyPrint)
      .catch(print);
  };

//update(actors);
//update(rating);
//update(conditionalUpdate);
//update(addNewAttribute);
//update(removeAttribute);
