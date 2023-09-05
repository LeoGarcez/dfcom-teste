'use client';

import React, { useEffect, useState, useContext } from 'react';
import StorageEnum from '../enums/StorageEnum';
import Storage from '../utils/Storage';
import { createContext } from 'react';

// User context
export const AuthContext = createContext({});

// User Context Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const storageUser = await Storage.getItem(StorageEnum.USER);

      if (storageUser) {
        setUser(storageUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function logIn() {
    const storageUser = await Storage.getItem(StorageEnum.USER);

    setUser(storageUser);
  }

  async function logOut() {
    setUser(null);
    await Storage.removeItem(StorageEnum.USER);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logOut,
        logIn,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to consume the user context
export function useUser() {
  const context = useContext(AuthContext);

  return context;
}
