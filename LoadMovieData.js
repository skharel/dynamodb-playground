'use strict';

let fs = require('fs');

let { AWS, tableName, print, prettyPrint } = require('./constants');
let docClient = new AWS.DynamoDB.DocumentClient();
let fsStream = fs.createReadStream('./movieData.json');

let allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

console.log(`Loading ${allMovies.length} movie data`);

allMovies
  .map(movie => ({
    TableName: tableName,
    Item: movie
  }))
  .map(movie => ({
    promise: docClient.put(movie).promise(),
    data: movie.Item
  }))
  .map(({ promise, data: movie }) => {
    promise
      .then(() => print(`Added ${movie.title}`))
      .catch(() => print(`** Failed to add ${movie.title}`));
  });
