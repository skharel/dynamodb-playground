'use strict';

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();

// for example usage of QUERY API

let queryAPI_by_Year = {
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
  queryAPI_by_Year_Title_Between_A_E = {
    TableName: tableName,
    //specify KeyConditions or KeyConditionExpression
    KeyConditionExpression: '#yr = :yr and title between :letter1 and :letter2',
    ExpressionAttributeNames: {
      '#yr': 'year' //because year is reserved keyword, must specify in this style
    },
    ExpressionAttributeValues: {
      ':yr': 2013,
      ':letter1': 'A',
      ':letter2': 'E'
    }
  },
  queryAPI_by_Year_Title_Starting_With_E = {
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
let scanAPI_by_Actors = {
    TableName: tableName,
    FilterExpression: 'contains(actors, :actor)',
    ExpressionAttributeValues: {
      ':actor': 'Matt Damon'
    }
  },
  scanAPI_by_year = {
    TableName: tableName,
    ProjectionExpression: '#yr, title, info.rating',
    FilterExpression: '#yr between :start_yr and :end_yr',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':start_yr': 2000,
      ':end_yr': 2018
    }
  },
  scanAPI_by_Genres = {
    TableName: tableName,
    ProjectionExpression: '#yr, title',
    FilterExpression: 'contains(info.genres, :genere)',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':genere': 'Comedy'
    }
  },
  //we added this field info.earnings.international in 3.3 > addNewNestedAttribute
  scanAPI_by_International_Earnings = {
    TableName: tableName,
    ProjectionExpression: '#yr, title',
    FilterExpression: 'info.earnings.international = :intlEarning',
    ExpressionAttributeNames: {
      '#yr': 'year'
    },
    ExpressionAttributeValues: {
      ':intlEarning': '100 million'
    }
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

//query(queryAPI_by_Year);
//query(queryAPI_by_Year_Title_Between_A_E);
//query(queryAPI_by_Year_Title_Starting_With_E);
//scan(scanAPI_by_Actors);
//scan(scanAPI_by_year);
//scan(scanAPI_by_Genres);
//scan(scanAPI_by_International_Earnings);
