const fs = require('fs');

class VariableStoreManager {
  constructor(options = {}) {
    this.fileName = options.fileName || 'storage.json';
    if (!fs.existsSync(this.fileName)) {
      // Create the file with default data
      fs.writeFileSync(this.fileName, '{}');
    }
    this.store = this.loadStoreData();
    this.watchers = [];

    return new Proxy(this, {
      get: function (target, key) {
        if (key === 'getVariables') {
          return target.getVariables.bind(target);
        }

        if (key === 'editVariable') {
          return target.editVariable.bind(target);
        }

        if (key === 'watchFileChanges') {
          return target.watchFileChanges.bind(target);
        }

        if (key === 'saveStoreData') {
          return target.saveStoreData.bind(target);
        }

        if (key === 'updateAllWatchers') {
          return target.updateAllWatchers.bind(target);
        }

        const value = target.store[key];

        if (typeof value === 'string') {
          try {
            target.store[key] = eval(`(${value})`);
            return target.store[key];
          } catch (error) {
            // If there's an error during the conversion, keep the original string
          }
        }

        if (typeof value === 'function') {
          return (...args) => value(...args);
        }

        return value;
      },
      set: function (target, key, value) {
        console.log(`Assigning value ${value} to key ${key}`);

        if (typeof value === 'function') {
          value = value.toString();
        }

        target.store[key] = value;
        target.updateAllWatchers();
        return true;
      },
      deleteProperty: function (target, key) {
        console.log(`Deleting key ${key}`);
        delete target.store[key];
        target.updateAllWatchers();
        return true;
      },
      apply: function(target, thisArg, argumentsList) {
        if (key === 'saveStoreData') {
          return target.saveStoreData.bind(target);
        }
        return target[key](...argumentsList);
      }
    });
  }

  loadStoreData() {
    try {
      const data = fs.readFileSync(this.fileName, 'utf8');
      const parsedData = JSON.parse(data);

      for (const key in parsedData) {
        if (typeof parsedData[key] === 'string') {
          try {
            parsedData[key] = eval(`(${parsedData[key]})`);
          } catch (error) {
            // If there's an error during the conversion, keep the original string
          }
        }
      }

      return parsedData;
    } catch (error) {
      return {};
    }
  }

  saveStoreData() {
    const dataToWrite = JSON.stringify(this.store, (key, value) => {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }, 2);

    if (Object.keys(this.store).length === 0) {
      try {
        if (fs.existsSync(this.fileName)) {
          fs.unlinkSync(this.fileName);
          console.log(`Deleted empty file: ${this.fileName}`);
        } else {
          console.log(`File not found: ${this.fileName}`);
        }
      } catch (error) {
        console.error(`Error deleting file: ${this.fileName}`, error);
      }
    } else {
      fs.writeFileSync(this.fileName, dataToWrite);
      console.log(`Saved data to file: ${this.fileName}`);
    }
  }

  getVariables() {
    return Object.keys(this.store);
  }

  editVariable(oldName, newName) {
    if (this.store.hasOwnProperty(oldName)) {
      this.store[newName] = this.store[oldName];
      delete this.store[oldName];
      this.updateAllWatchers();
      console.log(`Variable '${oldName}' renamed to '${newName}'.`);
    } else {
      console.log(`Variable '${oldName}' not found.`);
    }
  }

  watchFileChanges() {
    const watcher = fs.watch(this.fileName, (event) => {
      console.log(`File ${this.fileName} changed. Reloading data...`);
      this.store = this.loadStoreData();
      this.updateAllWatchers();
    });

    this.watchers.push(watcher);
    console.log(`Watching changes in file: ${this.fileName}`);
  }

  updateAllWatchers() {
    for (const watcher of this.watchers) {
      watcher.close();
    }
    this.watchers = [];
    this.watchFileChanges();
  }
}

module.exports = VariableStoreManager;
