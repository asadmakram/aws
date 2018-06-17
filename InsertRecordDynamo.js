const aws = require("aws-sdk");

// DB instance should be initialized in the starting or in the global scope.
// re-initialization every time takes time because this library function is quiet heavy.
// to keep the lambda memory efficient do initilize this object in the global scope.

const docClient = new aws.DynamoDB.DocumentClient(config)

exports.InsertRecordDynamo = function(event, context, callback){

// params structure which is required to create a record in DynamoDB Table.

  var itemToBeInserted = {
      'UserName': "User1",
      'Email': "abc@gmail.com",
      'PhoneNumber': "+1-3213-35464",
      'FirstName': "User",
      'LastName': "Test",
    };
    
  var params = {
    // 1. Table name in which we need to add a record.
    TableName: "TestTable", 
    
    // 2. an item which is needed to be added in the db.
    Item: itemToBeInserted,
    
    // 3. email should be unique or primary key.
    // :Email => can be named any other variable name. 
    // like Email_ and this Email_ should be same in the follwoing statement.
    ConditionExpression: 'Email <> :Email', 
    
    // 4. expression which should be validated.
    ExpressionAttributeValues: {
      ':Email': this.email
    }
  };

  try {
  
    docClient.put(params).promise()
      .then(function (result) {

        // successfully inserted the record in the database.
        callback(null, "successfully inserted record");
      }, function (err){

        // error occured while creating record.
        callback(null, err);
      });

  
  } catch(ex) {

        // exception occured while creating record.
        callback(null, ex);
  }


}
