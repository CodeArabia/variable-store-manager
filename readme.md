---
runme:
  id: 01HKJ15Q269A02S5053WC87Z8T
  version: v2.0
---

Variable Store Manager Library
Overview
The Variable Store Manager is a Node.js library that provides a flexible and dynamic way to manage variables and data in a file-based storage system. This library utilizes a Proxy object to intercept and handle various operations on the stored variables, allowing for functionalities such as getting, editing, adding, and deleting data.

Installation
To use the Variable Store Manager in your project, you can install it using npm:

```sh {"id":"01HKJ174ZTCM23YE5KJ5Y8QRR0"}
npm install variable-store-manager
```


Variable Store Manager Library
Overview
The Variable Store Manager is a Node.js library that provides a flexible and dynamic way to manage variables and data in a file-based storage system. This library utilizes a Proxy object to intercept and handle various operations on the stored variables, allowing for functionalities such as getting, editing, adding, and deleting data.

Installation
To use the Variable Store Manager in your project, you can install it using npm:

bash
Copy code
npm install variable-store-manager
Usage
To use the Variable Store Manager in your Node.js application, follow these steps:

Import the library:

```sh {"id":"01HKJ17WT96W88J842CW4PHTES"}
const VariableStoreManager = require('variable-store-manager');

```

Create an instance of the VariableStoreManager:

```sh {"id":"01HKJ18AR8R1H3V1GATMF2QAEX"}
const variableStore = new VariableStoreManager();

```

Use the provided methods to interact with the stored variables:

```sh {"id":"01HKJ18YWDCHSE6F5K0NN3PPFZ"}
// Get all variables
const allVariables = variableStore.getVariables();

// Add new data
variableStore.addData('newVariable', 'new value');

// Edit existing data
variableStore.editData('existingVariable', 'updated value');

// Delete data
variableStore.deleteData('variableToDelete');

```

API
constructor(options: object)
Creates a new instance of the VariableStoreManager.

options.fileName (optional): Specifies the name of the file used for storage. Default is 'storage.json'.
getVariables(): object
Returns an object containing all variables currently stored.

editVariable(oldName: string, newName: string): void
Renames an existing variable from oldName to newName.

watchFileChanges(): void
Starts watching changes to the storage file and reloads data when changes occur.

saveStoreData(): void
Saves the current state of the storage to the file.

updateAllWatchers(): void
Closes all file watchers and restarts watching for changes.

getData(path: string): any
Retrieves data at the specified path in the storage.

addData(path: string, newData: any): void
Adds new data at the specified path in the storage.

editData(path: string, newData: any): void
Edits existing data at the specified path in the storage.

deleteData(path: string): void
Deletes data at the specified path in the storage.

resolvePath(path: string): any
Helper function to resolve paths in the storage and retrieve the corresponding data.

Proxy Behavior
The library uses a Proxy to intercept and handle various operations on the stored variables. This includes getting, setting, and deleting variables. Additionally, functions such as getData, addData, editData, and deleteData are provided for more specific operations.

Variable Representation
Variables can be of any type, including strings, numbers, objects, or functions. Functions are stored as strings and can be executed when retrieved.

File Storage
The library persists data to a JSON file specified during instantiation. The file is created if it does not exist, and data is saved whenever changes occur.

Examples
Here are some examples illustrating the usage of the Variable Store Manager:

```sh {"id":"01HKJ19G2N7TBYCKZS5Q83BF7B"}
const variableStore = new VariableStoreManager();

// Adding new data
variableStore.addData('name', 'John Doe');
variableStore.addData('age', 25);

// Retrieving variables
const allVariables = variableStore.getVariables();
console.log(allVariables);

// Editing data
variableStore.editData('age', 26);

// Deleting data
variableStore.deleteData('name');

// Saving changes to file
variableStore.saveStoreData();

```
