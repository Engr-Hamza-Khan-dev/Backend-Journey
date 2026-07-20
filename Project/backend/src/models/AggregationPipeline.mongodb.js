

// ########## Aggregation Pipeline Practice #####################

/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("mongodbVSCodePlaygroundDB");

// Insert a few documents into the sales collection.
db.getCollection("sales").insertMany([
  {
    item: "abc",
    price: 10,
    quantity: 2,
    date: new Date("2014-03-01T08:00:00Z"),
  },
  {
    item: "jkl",
    price: 20,
    quantity: 1,
    date: new Date("2014-03-01T09:00:00Z"),
  },
  {
    item: "xyz",
    price: 5,
    quantity: 10,
    date: new Date("2014-03-15T09:00:00Z"),
  },
  {
    item: "xyz",
    price: 5,
    quantity: 20,
    date: new Date("2014-04-04T11:21:39.736Z"),
  },
  {
    item: "abc",
    price: 10,
    quantity: 10,
    date: new Date("2014-04-04T21:23:13.331Z"),
  },
  {
    item: "def",
    price: 7.5,
    quantity: 5,
    date: new Date("2015-06-04T05:08:13Z"),
  },
  {
    item: "def",
    price: 7.5,
    quantity: 10,
    date: new Date("2015-09-10T08:43:00Z"),
  },
  {
    item: "abc",
    price: 10,
    quantity: 5,
    date: new Date("2016-02-06T20:20:13Z"),
  },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db
  .getCollection("sales")
  .find({
    date: { $gte: new Date("2014-04-04"), $lt: new Date("2014-04-05") },
  })
  .count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection("sales").aggregate([
  // Find all of the sales that occurred in 2014.
  {
    $match: {
      date: { $gte: new Date("2014-01-01"), $lt: new Date("2015-01-01") },
    },
  },
  // Group the total sales for each product.
  {
    $group: {
      _id: "$item",
      totalSaleAmount: { $sum: { $multiply: ["$price", "$quantity"] } },
    },
  },
]);

db.getCollection("sales").aggregate([
  {
    $group: {
      _id: "$price",
      item: { $push: "$item" },
    },
  },
]);

db.getCollection("sales").aggregate([
  {
    $match: {
      item: "abc",
    },
  },
]);

db.getCollection("sales").aggregate([
  {
    $group: {
      _id: "$price",
      PoraDocument: { $push: "$$ROOT" },
    },
  },
]);

db.User.insertMany([
  { name: "Ali Khan", age: 22, city: "Lahore", score: 78 },
  { name: "Sara Ahmed", age: 25, city: "Karachi", score: 91 },
  { name: "Usman Tariq", age: 30, city: "Islamabad", score: 85 },
  { name: "Ayesha Malik", age: 21, city: "Lahore", score: 69 },
  { name: "Hassan Raza", age: 28, city: "Peshawar", score: 74 },
  { name: "Fatima Noor", age: 24, city: "Quetta", score: 88 },
  { name: "Bilal Ahmed", age: 27, city: "Karachi", score: 95 },
  { name: "Zainab Ali", age: 23, city: "Islamabad", score: 81 },
  { name: "Omar Farooq", age: 26, city: "Lahore", score: 67 },
  { name: "Hina Shah", age: 29, city: "Multan", score: 73 },
  { name: "Saad Iqbal", age: 31, city: "Karachi", score: 89 },
  { name: "Noor Fatima", age: 20, city: "Lahore", score: 92 },
  { name: "Hamza Javed", age: 27, city: "Islamabad", score: 76 },
  { name: "Maryam Khan", age: 22, city: "Quetta", score: 84 },
  { name: "Daniyal Hussain", age: 33, city: "Peshawar", score: 90 },
]);

db.getCollection("User").aggregate([
  {
    $group: {
      _id: "$age",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $group: {
      _id: null,
      maximum: {
        $max: "$count",
      },
    },
  },
]);




db.getCollection("User").aggregate([
  {
    $group: {
      _id: "$age",
      count: {
        $sum:{
            $toDouble:"$age"
        },
      },
    },
  }
]);



db.getCollection("User").aggregate([
  {
    $group: {
      _id: "$age",
      Cities:{
        $push:"$city"
      }
    },
  }
]);


db.User.insertMany([
  { name: "Ali Khan", age: 22, city: "Lahore", hobbies: ["cricket", "gaming", "travel"] },
  { name: "Sara Ahmed", age: 25, city: "Karachi", hobbies: ["reading", "cooking", "yoga"] },
  { name: "Usman Tariq", age: 30, city: "Islamabad", hobbies: ["football", "gym", "travel"] },
  { name: "Ayesha Malik", age: 21, city: "Lahore", hobbies: ["painting", "reading"] },
  { name: "Hassan Raza", age: 28, city: "Peshawar", hobbies: ["cricket", "gym"] },
  { name: "Fatima Noor", age: 24, city: "Quetta", hobbies: ["cooking", "travel", "photography"] },
  { name: "Bilal Ahmed", age: 27, city: "Karachi", hobbies: ["gaming", "football"] },
  { name: "Zainab Ali", age: 23, city: "Islamabad", hobbies: ["reading", "yoga", "travel"] },
  { name: "Omar Farooq", age: 26, city: "Lahore", hobbies: ["cricket", "photography"] },
  { name: "Hina Shah", age: 29, city: "Multan", hobbies: ["cooking", "gardening"] },
  { name: "Saad Iqbal", age: 31, city: "Karachi", hobbies: ["gym", "travel", "gaming"] },
  { name: "Noor Fatima", age: 20, city: "Lahore", hobbies: ["reading", "painting"] },
  { name: "Hamza Javed", age: 27, city: "Islamabad", hobbies: ["football", "gym", "gaming"] },
  { name: "Maryam Khan", age: 22, city: "Quetta", hobbies: ["photography", "travel"] },
  { name: "Daniyal Hussain", age: 33, city: "Peshawar", hobbies: ["cricket", "gardening"] }
]);


db.getCollection("User").aggregate([
  {
    $group: {
      _id: "$age",
      hobbies:{
        $push:"$hobbies"
      }
    },
  }
]);


db.getCollection("User").aggregate([
  {
    $unwind: "$hobbies",
    }
    ,{
        $group: {
          _id: "$age",
          hobbies: {
            $push: "$hobbies"
          }
        }
    }
]);


db.getCollection("User").aggregate([
  {
    $unwind:"$hobbies"
  }
  ,  {
    $group: {
      _id: "$hobbies",
      count: {
        $sum: 1
      }
    }
  }
])


db.getCollection("User").aggregate([
   {
    $group: {
      _id: null,
      Average: {
        $avg: "$age"
      }
    }
  }
])


db.getCollection("User").aggregate([
   {
    $group: {
      _id: null,
      hobbiesOfAllUser: {
        $sum:{
            $size:{
                $ifNull:[
                    "$hobbies",[]
                ]
            }
        }
      }
    }
  }
])


db.getCollection("User").aggregate([
   {
    $unwind:"$hobbies"
   },{
    $group: {
      _id: null,
      ListAllHobbies: {
        $addToSet:"$hobbies"
      }
    }
  }
])



db.getCollection("User").aggregate([
  {
    $match: { age: { $gt: 30 } }
  },
  {
    $group: {
      _id: null,
      users: { $push: "$name" }
    }
  }
])


db.getCollection("User").aggregate([
  {
    $group: {
      _id: null,
      allUsers: { $push: "$$ROOT" }
    }
  },
  {
    $project: {
      filtered: {
        $filter: {
          input: "$allUsers",
          as: "user",
          cond: { $gt: ["$$user.age", 30] }
        }
      }
    }
  }
])

db.User.aggregate([
  {
    $bucket: {
      groupBy:"$age",
      boundaries: [ 0, 30,40 ],
      default: "Greater then 40",
      output: {
        Count: { $sum:1 },
        name:{$addToSet:"$name"}
      }
    }
  }
])


db.Cust.insertMany([
  { name: "Ali", age: 22 },
  { name: "Sara", age: 25 },
  { name: "Ahmed", age: 30 },
  { name: "Ayesha", age: 28 }
]);

db.Order.insertMany([
  { custid: 1, product: "Laptop", price: 1200 },
  { custid: 1, product: "Mouse", price: 20 },
  { custid: 2, product: "Phone", price: 800 },
  { custid: 5, product: "Tablet", price: 400 }
]);

db.Order.find();


db.Cust.aggregate([
  {
    $lookup: {
      from: "Order",
      localField: "_id",
      foreignField: "custid",
      as: "NewField"
    }
  },
  {
    $match: {
      "NewField.0":{
        $exists:true
      }
    }
  }
])

db.Cust.aggregate([
  {
    $match: {
      name: "Ali"
    }
  },
  {
    $lookup: {
      from: "Order",
      let: { cust_id: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$custid", "$$cust_id"] }
          }
        },
        {
          $group: {
            _id: null,
            products: { $push: "$product" }
          }
        }
      ],
      as: "Productname"
    }
  }
])