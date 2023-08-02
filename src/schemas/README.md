# 🍃 MongoDB schemas
  
- [Guide](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

To add a new schema, create a new Javascript file in the `schemas/` folder:
```js
const { Schema, model, models } = require("mongoose");
const path = require("path");

const tutorialSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    reminder: { type: String, default: "You can always use this as reference or look at the guide." }
});

module.exports = models[path.basename(__filename, ".js")] || model(path.basename(__filename, ".js"), tutorialSchema);
```
The file name determines the schema name. In this case, the file name should be `tutorial.js`, which will create a schema called `tutorial`, and a collection called `tutorials`.

## What you need to know
1. The `required` property is set to `false` if not defined.

## Using schemas
Find and create documents:
```js
const Tutorial = require("../schemas/tutorial");

// ...

let document = await Tutorial.findOne({ name: "Example Tutorial" }); // Find document based on a property

if (!document) {
    // Create a new document based on the Tutorial schema if it doesn't already exist
    document = await new Tutorial({
        name: "Example Tutorial",
        age: 20,
        reminder: "This creates a new document."
    }).save();
}
```
Modify documents:
```js
const Tutorial = require("../schemas/tutorial");

// ...

await Tutorial.findOneAndUpdate(
    { age: 20 }, // findOne
    { reminder: "This document has the age property set to 20." } // AndUpdate
);
```
You can also modify documents based on their `_id`:
```js
const Tutorial = require("../schemas/tutorial");

// ...

const document = await Tutorial.findOne({ age: 20 });

// Now you have access to the document.
// You can, for example, check if it exists before modification.

await Tutorial.findOneAndUpdate(
    {_id: document._id}, // findOne
    { reminder: "This will modify the same document as the previous code." } // AndUpdate
);
```
> ***Note:*** Every document has a unique `_id` property by default.

## Storing Discord users
Storing Discord users is different to storing other data. Since each Discord user ID is unique, we can use it as the primary `_id` for the schema:
```js
// ...
const exampleUserSchema = new Schema({
    _id: { type: String, required: true }, // Discord user ID
    balance: { type: Number, default: 0 }, // Example property
// ...
```
Searching for users then becomes much easier:
```js
const document = await User.findOne({ _id: user.id });
```
> ***Note:*** This approach is not necessary, but greatly recommended.

## Recommended way of managing data
The recommended way of managing data is to create a new file for each action in the `functions/` directory. For example, if you want to fetch user data, you can create a new file called `fetch-user.js` inside the `functions/` directory:
> ***Pro-tip:*** Put files into sub-directories to organize your code.
```js
const User = require("../schemas/user");

module.exports = (client) => {
    client.fetchUser = async (filter) => {
        let document = await User.findOne(filter);

        // Automatically create a new document if it doesn't exist
        if (!document) {
            document = await new User({
                _id, // Discord user ID
                balance: 50,
                inventory: [{ name: "Example item", amount: 1}, { name: "Another item", amount: 3}]
            }).save()
        }

        return document;
    }
}
```
This way, you can easily access the function from anywhere in your code:
```js
const document = await client.fetchUser({ _id: user.id });
```
> ***Warning:*** Some of the above code snippets have not been tested yet, and may not work as intended. Please report any issues you find.
