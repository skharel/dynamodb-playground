#### Table:

- Data is stored in TABLE
- Performance is managed at the table level
- Tables are schema-less meaning structure of data does not need to be predefined except for primary key.
- Tables are scoped within an Account and Region.

#### Item:

- Each table has number of rows. Each row each referred as ITEM.
- The maximum item size in DynamoDB is 400 KB, which includes both attribute name binary length (UTF-8 length) and attribute value lengths (again binary length). The attribute name counts towards the size limit.

#### Attributes

- Each Item has number of ATTRIBUTES (columns in SQL world).
- DynamoDB being schemaless, each item can have different attributes

### Partition:

- Literatures

  - [Partitions and Data Distributions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html)
  - [Choosing the right DynamoDB partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-DynamoDB-partition-key/)

- DynamoDB stores data in partitions. A partition is an allocation of storage for a table.

- DyanmoDB supports **two types of primary keys**:

  1. Partition Key (Simple Primary Key): This type of key is composed of one attrbute known as the partition key (hash key). DynamoDB stores and retrieves each items based on its partition key value. <br/> <br/> DynamoDB uses the partition key's value as an input to an internal has function and based on the output of this hash function, determines where the item will be stored or read from. **It is very strongly recommended that the partition key have a large number of distinct values relative to the number of items in the table**

  2. Partition key and sort key _(Composite Primary Key)_: This type of key is composed of two attributes; first attribute is the partition key (hash key) and the second one is sort key (or range key). In this case, dyanamoDB calculates the hash value of the partition key of the in the same way as described for simple primary key; all items with the same partition key are then stored physically close together, ordered by sort key value.<br/> <br/> To _write an item_ to the table, DyanamoDB calculates the has value of the partition key to determine which partition should contain the item. Then in the partition, dyanmoDB stores the item together with the oher item that has same partition key in ascending order by sort key. <br/><br/> To read an items, you must specify its partition key value and sort key value. DyanmoDB calculats the partition key's has value, yielding the partition in which the item can be found.

  - Read the literature choosing the right DynamoDB partition Key to learn about the Recommendations & Antipattern for partition keys.

#### Data types

- [Literature](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes)

**Scalar**

- to represent only one values
- String
- Number
- Binary
- Boolean
- Null

**Document**

- to represent complex data type
- List and Map are document data types. These data types can be nested within each other, to represent complex data structures up to 32 levels deep.

- List

  - similar to JSON array
  - can store ordered collection of values
  - No restrictions on the data types that can be stored in a liste element and ethe elements in the list element do not have to be of the same type
  - DynamoDB lets you work with individual elements within lists, even if those elements are deeply nested. For more information, see [Using Expressions in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.html).

- Map
  - similar to JSON Object
  - to store an unordered collection of name-value pairs. Maps are enclosed in curly braces: {}
  - No restrictions on data types the can be stored in a map element and the elements in map do not have to be of the sme type.
  - Example:
  ```
  {
    Day: "Monday",
    UnreadEmails: 42,
    ItemsOnMyDesk: [
        "Coffee Cup",
        "Telephone",
        {
            Pens: { Quantity : 3},
            Pencils: { Quantity : 2},
            Erasers: { Quantity : 1}
        }
    ]
  }
  ```
  - DynamoDB lets you work with individual elements within maps, even if those elements are deeply nested. For more information, see [Using Expressions in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.html).

**Set**

- to represent multiple scalar values
- String set (eg: ["Black", "Green", "Red"])
- Number set (eg: [42.2, -19, 7.5, 3.14])
- Binary set (eg: ["U3Vubnk=", "UmFpbnk=", "U25vd3k="])
- All elements of set must be of the same type (cannot mix String or Number or Binary in a set)
- Because it is set, each value withing a set must be unique
- The order of values within a set is not presereved
- Empty set is not supported
