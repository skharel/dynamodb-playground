### About this repo

This repository has example of how to interact with dynamodb using Node.js. The content is primarily from [AWS DyanamoDB tutorial for Node.js](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html). However, I have made some changes to the data model (discussed below) to add few more examples.

Included is also more elaborate [notes](./notes.md) that includes Terminology, concepts and links related to DyanmoDB literature.

### Getting Started

#### Pre-req

- You can navigate to DynamoDB console in AWS
- Must have Node.js in your system
- Must have AWS CLI installed & configured AWS Credentials using the AWS CLI

#### Starting with this repo

- Clone this repo
- Install packages by running
  ```
      npm i
  ```

### Executing JS files

`node <filename>.js`

This will use default AWS profile. If you want to use someother profile, run as:

`AWS_PROFILE=<profileName> node <filename>.js`

### Scripts interacting with DyanamoDB

1.  Step 1: [Create Table](./CreateTable.js)

    ```
     node CreateTable.js
    ```

    Things to note:

    - This table uses composite key composed of two attributes
    - Year is the partition key and title is the sort key
    - **API:** uses _createTable_ API call from `new AWS.DynamoDB()`

2.  Step 2: [Load Movie data](./LoadMovieData.js)

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
            "running_time_secs" : 5215,
            earnings: {
                domestic: 'amount',
                international: 'amount'
            }
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

    - Note: info.earnings is not present in the sample data file. At step [3.1_CreateNewItem.js](./3.1_CreateNewItem.js) we will insert new record and in step [3.3_UpdateItem.js](./3.3_UpdateItem.js#L64), we will add this nested map object for the data we inserted in 3.1. We will also use this nested map attribute to show an example of query in [QueryAndScan.js](./QueryAndScan.js).
      <br/> <br/>

    In short the data model uses most of the data types dyanamoDB supports.

3.  Step 3: All CRUD operations:

    <br/>
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

    <br/>
    2. Read an Item:

    ```
        node 3.2_ReadItem.js
    ```

    Things to Note:

    - **API:** uses _get_, _query_, _scan_, API call from `new AWS.DynamoDB.DocumentClient()`
    - query and scan are discussed later
    - Read (notes.md)[./notes.md]


    <br/>
    3. Update an Item:

    ```
        node 3.3_UpdateItem.js
    ```

    All the API calls are commented out in the bottom of the file; uncomment the one you want to see in action

    Things to Note:

    - **API:** uses _update_ API call from `new AWS.DynamoDB.DocumentClient()`
    - Read [notes.md](./notes.md)
    - Example includes updating top level list of string, nested rating, conditional update, adding new top level attribute, adding nested map attribute info.earning, updating nested map info.earning.international attribute and removing attribute

    <br/>
    4. Delete an Item:

    ```
        node 3.4_DeleteItem.js
    ```

    All the API calls are commented out in the bottom of the file; uncomment the one you want to see in action

    Things to Note:

    - **API:** uses _delete_ API call from `new AWS.DynamoDB.DocumentClient()`
    - Read (notes.md)[./notes.md]
    - Example includes removing item by using primary key, removing item by using primary key and conditional expression

4.  Query and Scan:

    ```
        node QueryAndScan.js
    ```

    Things to note:

    - **API:** uses _query_, _scan_, API call from `new AWS.DynamoDB.DocumentClient()`
    - Example of query includes: query by year, query by year and title starting with A - E, query by year title starting with E only
    - Example of Scan includes scanning top level list of actors, scan using partition key years using between operator, scanning using nested array info.genres & scaning using nested map info.earnings.international (We add this field in step 3.3)
    - Note the response of count vs ScannedCount in console. The higher the difference, more performance issue likely to happen.
