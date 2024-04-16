import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAdmin(){
    return useContext(AuthContext)
}

export function AdminProvider({ children }) {

    const value = {

    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
