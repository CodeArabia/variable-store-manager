---
runme:
  id: 01HJAHNAPP6N4X0K2S2NXB67FF
  version: v2.0
---

# VariableStoreManager

A simple module for managing and persisting variables, inspired by Redux, in a JSON-like format.

## Installation

You can install the VariableStoreManager using npm:

```bash
npm install variable-store-manager

Usage of the Library :

```sh {"id":"01HJCEXQTGY0V8C0V9TK50RSAB"}
const VariableStoreManager = require('variable-store-manager');

// Create an instance of VariableStoreManager
const store = new VariableStoreManager();

// Set a variable
store.variableName = 'Hello, World!';

// Get all variables
const variables = store.getVariables();
console.log(variables); // Output: ['variableName']

// Delete a variable
delete store.variableName;

// Check if the store is empty and delete the underlying JSON file
store.saveStoreData();

```

```sh {"id":"01HJCF03HABES3378QNHAYTW2J"}
new VariableStoreManager(options) //Creates a new instance of the VariableStoreManager.

options (optional) // Configuration options.
fileName (optional) // The name of the JSON file to load/store data. Default is 'storage.json'.

// another example for changing the name of the json file or creating a new file 
const store = new VariabelStoreManger({filename : "./store.json"})


storeInstance.getVariables() //Returns an array of all keys (variables) in the store.
storeInstance.variableName = "variabel name" // You can directly access and modify variables using properties.

storeInstance.saveStoreData() //Saves the current state of the store to the JSON file. If the data is empty, it deletes the file.

delete storeInstance.variableName //Deletes a variable from the store.


```


License
This project is licensed under the MIT License - see the LICENSE file for details.
Feel free to use this README template as a starting point for your library. If there are additional details or features you'd like to include, you can customize it further.