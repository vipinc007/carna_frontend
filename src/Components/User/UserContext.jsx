import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  var [listReloadCounter, setListReloadCounter] = React.useState(0);
  var [editingUserID, setEditingUserID] = React.useState(null);

  return (
    <UserContext.Provider
      value={{
        editingUserID,
        setEditingUserID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
