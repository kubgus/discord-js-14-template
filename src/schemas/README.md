# 🍃 MongoDB schemas
  
- [Guide](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

To add a new schema, create a new Javascript file in the `schemas/` folder:
```js
const { Schema, model, models } = require('mongoose');

const modelName = "Tutorial";
const tutorialSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: { type: Number, required: false },
    reminder: { type: String, default: "You can always use this as reference or look at the guide." }
});

module.exports = models[modelName] || model(modelName, tutorialSchema, "tutorial");
```
The file name should be the same as the schema name.

## What you need to know
1. The first argument of the `model()` method takes in its name.
1. The second argument of the `model()` method takes in the schema.
1. The third argument of the `model()` method takes in the name of the collection where your data will be stored.

## Using schemas
Find and create documents:
```js
const { Types } = require("mongoose");

const Tutorial = require("../schemas/tutorial");

// ...

let document = await Tutorial.findOne({ name: "Example Tutorial" }); // Find document based on a property

if (!document) {
    // Create a new document based on the Tutorial schema if it doesn't already exist
    document = await new Tutorial({
        _id: new Types.ObjectId(),
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
> ***Note:*** Every document has an `_id` property.

## Storing Discord users
Storing Discord users is different to storing other data. Since each Discord user ID is unique, we can use it as the primary `_id` for the schema:
```js
// ...
const exampleUserSchema = new Schema({
    _id: String, // Discord user ID
    balance: Number,
// ...
```
Searching for users then becomes much easier:
```js
const document = await User.findOne({ _id: user.id });
```
> ***Note:*** This approach is not necessary, but greatly recommended.