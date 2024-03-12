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
    const [loaded, setLoaded] = useState(false)

    async function login(email, password){
      return new Promise((resolve, reject) => {
        loginWithEmailAndPassword(email, password).then(tokenInfo => {
          const {access_token} = tokenInfo
          const decrypted = decryptToken(access_token)
          setBearerToken(tokenInfo)
          setCurrentUser(decrypted)
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

    function decryptToken(token){
      const {firstName, lastName, sub} = jwtDecode(token)
      return {firstName, lastName, sub}
    }
    
    const value = {
      currentUser,
      setCurrentUser,
      login,
      logout,
      register,
      allUsers,
      loaded,
      setLoaded
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
