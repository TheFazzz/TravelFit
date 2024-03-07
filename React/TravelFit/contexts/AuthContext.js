import React, { useContext, useState, useEffect } from 'react'
import {
  loginWithEmailAndPassword,
  registerNewUser,
  getAllUsers
} from './AuthConnection'

import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bearerToken, setBearerToken] = useState(null)

    async function login(email, password){
      return new Promise((resolve, reject) => {
        loginWithEmailAndPassword(email, password).then(tokenInfo => {
          const {access_token} = tokenInfo
          setBearerToken(tokenInfo)
          setCurrentUser(decryptToken(access_token))
          resolve(true)

        }).catch(error => reject(error))
      })
    }

    async function register(first_name, last_name, email, password){
      return registerNewUser(first_name, last_name, email, password)
    }

    async function allUsers(){
      return getAllUsers()
    }

    async function logout() {
      setCurrentUser(null)
      setBearerToken(null)
    }

    async function decryptToken(token){
      const {firstName, lastName, sub} = jwtDecode(token)
      console.log(details)
      return {firstName, lastName, sub}
  }
    
    const value = {
      currentUser,
      setCurrentUser,
      login,
      logout,
      register,
      allUsers
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
