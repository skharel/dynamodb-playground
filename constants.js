'use strict';

module.exports = {
  tableName: 'test.Movies',
  print: console.log,
  prettyPrint: json => console.log(JSON.stringify(json, null, 2))
};
