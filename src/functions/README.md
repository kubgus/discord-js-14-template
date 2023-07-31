# 🟢 Custom functions
  
- Functions are modules that run once the client is ready and provide the base functionality of the bot

To add a custom function, create a new Javascript file in the `functions/` folder:
```js
module.exports = (client) => {
    console.log("This example function runs once the client is ready. It can utilize the client.");
}
```
The function name is not important and only serves for debug purposes.

<!-- ## What you need to know
1.  -->
