// Local Storage Service (for offline functionality)
class LocalStorageService {
    static setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    static getItem(key) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  
    static removeItem(key) {
      localStorage.removeItem(key);
    }
  }
  
  export LocalStorageService;