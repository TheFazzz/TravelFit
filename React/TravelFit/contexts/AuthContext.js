import React, { useContext, useState, useEffect } from 'react'
import {
  loginWithEmailAndPassword,
  registerNewUser,
  getAllUsers,
  purchaseGymPassByIdandPassOptionId,
  getUserPasses
} from './AuthConnection'

import { jwtDecode } from 'jwt-decode'
import 'core-js/stable/atob'
import { accessibilityProps } from 'react-native-web/dist/cjs/modules/forwardedProps'
import { LogBox } from 'react-native'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bearerToken, setBearerToken] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
      LogBox.ignoreLogs(['Asyncstorage: ...'])
      LogBox.ignoreAllLogs()
    }, [])

    async function login(email, password){
      return new Promise((resolve, reject) => {
        loginWithEmailAndPassword(email, password).then(tokenInfo => {
          
          const {access_token} = tokenInfo
          const decrypted = decryptToken(access_token)
          const userRole = 'User' //change to 'User' or 'Gym' to change roles
          
          setBearerToken(access_token)
          setCurrentUser(decrypted)
          setUserRole(userRole)
          resolve(userRole)
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
      setUserRole(null)
    }

    function decryptToken(token){
      const {firstName, lastName, sub} = jwtDecode(token)
      return {firstName, lastName, sub}
    }

    function purchasePass(gym_id, pass_option_id) {
      return purchaseGymPassByIdandPassOptionId(gym_id, pass_option_id, bearerToken)
    }

    function userPasses(){
      const {sub} = currentUser
      return getUserPasses(bearerToken, sub)
    }
    
    const value = {
      currentUser,
      setCurrentUser,
      userRole,
      login,
      logout,
      register,
      allUsers,
      loaded,
      setLoaded,
      purchasePass,
      userPasses
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
