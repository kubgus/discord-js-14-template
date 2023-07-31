# 🍃 MongoDB schemas
  
- [Guide](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

To add a new schema, create a new Javascript file in the `schemas/` folder:
```js
const { Schema, model } = require('mongoose');

const tutorialSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: { type: Number, required: false },
    reminder: { type: String, default: "You can always use this as reference or look at the guide." }
});

module.exports = model("Tutorial", tutorialSchema, "tutorial");
```
The file name should be the same as the schema name.

## What you need to know
1. The first argument of the `model()` method takes in its name.
1. The second argument of the `model()` method takes in the schema.
1. The third argument of the `model()` method takes in the name of the collection where your data will be stored.
