I am Learning DynamoDB using Node.js. [Terminology and concepts are in notes](./notes.md).

Table, scripts, data in this repository follows the [AWS DyanamoDB tutorial for Node.js](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html)

### Configure AWS CLI to run the scripts

1. Configure AWS credentials using AWS CLI

2. Run the program as:

   `node <filename>.js`

   This will use default AWS profile. If you want to use someother profile, run as:

   `AWS_PROFILE=<profileName> node <filename>.js`

### Scripts interacting with DyanamoDB

1. Step 1: [Create Table](./CreateTable.js)

   ```
    node CreateTable.js
   ```

   Things to note:

   - This table uses composite key composed of two attributes
   - Year is the partition key and title is the sort key
   - **API:** uses _createTable_ API call from `new AWS.DynamoDB()`

2. Step 2: [Load Movie data](./LoadMovieData.js)

   ```
       node LoadMovieData.js
   ```

   Things to note:

   - The data model for movie file is downloaded from AWS tutorial site but I removed lot of movie data so that my test data size is small
   - Also I added actors as top level object instead of nesting it inside info for some demo example later
   - **API:** uses _put_ API call from `new AWS.DynamoDB.DocumentClient()`
   - Example of a movie data:

   ```
   {
       "year" : 2013,
       "title" : "Turn It Down, Or Else!",
       "actors" : [
               "David Matthewman",
               "Ann Thomas",
               "Jonathan G. Neff"
        ],
       "info" : {
           "directors" : [
               "Alice Smith",
               "Bob Jones"
           ],
           "release_date" : "2013-01-18T00:00:00Z",
           "rating" : 6.2,
           "genres" : [
               "Comedy",
               "Drama"
           ],
           "image_url" : "http://ia.media-imdb.com/images/N/O9ERWAU7FS797AJ7LU8HN09AMUP908RLlo5JF90EWR7LJKQ7@@._V1_SX400_.jpg",
           "plot" : "A rock band plays their music at high volumes, annoying the neighbors.",
           "rank" : 11,
           "running_time_secs" : 5215
       }
   }
   ```

   - For each movie, there are three attributes: year, title, actors and info
   - data type for year and title is string
   - data type for actors is sets of string
   - data type for info is a map object and demonstrates how a map can be stored in DynamoDB
   - inside the info:
     - directors & genres are sets of string
     - release_date is timestamp with timezone
     - rating is decimal value
     - image_url, plot are of type string
     - rank and running_time_secs are of type number
       <br/> <br/>

   In short the data model uses most of the data types dyanamoDB supports.

3. Step 3: All CRUD operations:

   1. Create new Item:

   ```
       node 3.1_CreateNewItem.js
   ```

   Things to Note:

   - **API:** uses _put_ API call from `new AWS.DynamoDB.DocumentClient()`
   - Intially when the script is run data will be inserted
   - If you run the script again, it runs with out error. Update any value in the info attribute and try to run again. The data will be updated. So, put is an operation that either inserts or update
   - The value of composite primary key must be provided for the put operation (obviously!)
   - I added the field `ReturnConsumedCapacity` so that we can know about WCU used by dyanamoDB

   2. Read an Item:

   ```
       node 3.2_ReadItem.js
   ```

   All the API calls are commented out in the bottom of the file; uncomment the one you want to see in action

   Things to Note:

   - **API:** uses _get_, _query_, _scan_, API call from `new AWS.DynamoDB.DocumentClient()`
   - Read (notes.md)[./notes.md]
   - Note: It is possible to scan top level list object and example is included. For example, querying by actors in our data model. However, I haven't figured out a way to scan nested array. For example by directors which is inside info object)
   - **TODO** figure out scan/query by nested object

   3. Update an Item:

   ```
       node 3.3_UpdateItem.js
   ```

   All the API calls are commented out in the bottom of the file; uncomment the one you want to see in action

   Things to Note:

   - **API:** uses _update_ API call from `new AWS.DynamoDB.DocumentClient()`
   - Read (notes.md)[./notes.md]
   - Example includes updating top level list of string, nested rating, conditional update, adding new attribute and removing attribute
