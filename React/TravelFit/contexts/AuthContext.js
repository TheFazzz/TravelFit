import React, { useContext, useState, useEffect } from 'react'
import {
  loginWithEmailAndPassword,
  registerNewUser,
  getAllUsers
} from './AuthConnection'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function login(email, password){
      return loginWithEmailAndPassword(email, password)
    }

    async function register(first_name, last_name, email, password){
      return registerNewUser(first_name, last_name, email, password)
    }

    async function allUsers(){
      return getAllUsers()
    }
    
    const value = {
      currentUser,
      setCurrentUser,
      login,
      register,
      allUsers
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
