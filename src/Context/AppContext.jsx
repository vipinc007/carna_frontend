import React, { createContext, useState } from "react";
import Store from "../Common/Store";
export const AppContext = createContext();

// This context provider is passed to any component requiring the context
export const AppContextProvider = ({ children }) => {
  var [objectList, setObjectList] = useState([]);

  function get_taken_objects() {
    if (objectList.length === 0) {
      objectList = Store.getData().data;
    }
    return objectList;
  }

  function store_object(obj) {
    var tt = Store.getData();
    tt.data.push(obj);
    Store.setData(tt);
    setObjectList(tt.data);
  }

  function remove_object(obj) {
    var tt = Store.getData();
    tt.data = tt.data.filter((item) => item !== obj);
    Store.setData(tt);
    setObjectList(tt.data);
  }

  function store_reset(obj) {
    Store.clearData();
    setObjectList([]);
  }

  return (
    <AppContext.Provider
      value={{
        get_taken_objects,
        store_object,
        store_reset,
        remove_object,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
