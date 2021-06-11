class Store {
  static __session_storage_key = "vipin-chriyanveetil-object-list";

  static setData(value) {
    sessionStorage.setItem(this.__session_storage_key, JSON.stringify(value));
  }

  static getData() {
    var res = null;

    if (
      sessionStorage.getItem(this.__session_storage_key) != null &&
      sessionStorage.getItem(this.__session_storage_key) != undefined
    ) {
      res = JSON.parse(sessionStorage.getItem(this.__session_storage_key));
    }
    return res === null ? { data: [] } : res;
  }

  static clearData() {
    sessionStorage.clear();
  }
}

export default Store;
