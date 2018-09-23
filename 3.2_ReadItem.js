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
  },
  get = () => {
    print(
      '=========== Getting item using composite primary keys ==================='
    );
    docClient
      .get(compositeKeys) //for get MUST SPECIFY all the primary keys
      .promise()
      .then(prettyPrint)
      .catch(print);
  };

// for example usage of QUERY API
/*
  - take a note of begins_with
  - in AWS console, try to run the query and see what other options you can pick beside begins_with
  - This query retrieves all movies released in 2013 and title starts with E
*/
let queryAPI_1_by_Year_Title = {
    TableName: tableName,
    //specify KeyConditions or KeyConditionExpression
    KeyConditionExpression: '#yr = :yr and begins_with(title, :title)',
    ExpressionAttributeNames: {
      '#yr': 'year' //because year is reserved keyword, must specify in this style
    },
    ExpressionAttributeValues: {
      ':yr': 2013,
      ':title': 'E'
    }
  },
  /**
   This query is looking for all movie that was release in 2013
   */
  queryAPI_2_by_Year = {
    TableName: tableName,
    //specify KeyConditions or KeyConditionExpression
    KeyConditionExpression: '#yr = :yr',
    ExpressionAttributeNames: {
      '#yr': 'year' //because year is reserved keyword, must specify in this style
    },
    ExpressionAttributeValues: {
      ':yr': 2013
    }
  },
  query = params => {
    print(
      '=========== Querying item using filter expression ==================='
    );
    docClient
      .query(params)
      .promise()
      .then(prettyPrint)
      .catch(print);
  };

// for example usage of SCAN API
/*
  - This query scans actors which is an array of string
*/
let scanAPI_1_by_Actors = {
    TableName: tableName,
    FilterExpression: 'contains(actors, :actor)',
    ExpressionAttributeValues: {
      ':actor': 'Matt Damon'
    }
  },
  scanAPI_2 = {
    //TODO Figure out how to query by directors which is inside info object
  },
  scan = params => {
    print('=========== Scanning items ===================');
    docClient
      .scan(params)
      .promise()
      .then(prettyPrint)
      .catch(print);
  };

// ============ API calls ===============
//get();
//query(queryAPI_1_by_Year_Title);
//query(queryAPI_2_by_Year);
//scan(scanAPI_1_by_Actors);
