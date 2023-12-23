const fs = require('fs');

/**
 * @typedef {Object} VariableStoreManagerOptions
 * @property {string} [fileName] - The name of the JSON file to load/store data.
 */

/**
 * @typedef {Object} VariableStoreManagerStore
 */

class VariableStoreManager {
  /**
   * @param {VariableStoreManagerOptions} [options] - Options for the VariableStoreManager.
   */
  constructor(options = {}) {
    this.fileName = options.fileName || 'storage.json';
    this.store = this.loadStoreData();
    this.lastAccessedProperty = null;

    return new Proxy(this, {
      get: (target, key) => {
        if (key === 'getVariables') {
          return target.getVariables.bind(target);
        }
        this.lastAccessedProperty = key;
        return target.store[key];
      },
      set: (target, key, value) => {
        console.log(`Assigning value ${value} to key ${key}`);
        target.store[key] = value;
        target.saveStoreData();
        return true;
      },
      deleteProperty: (target, key) => {
        console.log(`Deleting key ${key}`);
        delete target.store[key];
        target.saveStoreData();
        return true;
      }
    });
  }

  loadStoreData() {
    try {
      const data = fs.readFileSync(this.fileName, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  saveStoreData() {
    const dataToWrite = JSON.stringify(this.store, null, 2);
    
    // Check if the data is empty, and delete the file if it is
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

  /**
   * @returns {string[]} - Array of all keys (variables) in the store.
   */
  getVariables() {
    return Object.keys(this.store);
  }
}

module.exports = VariableStoreManager;
