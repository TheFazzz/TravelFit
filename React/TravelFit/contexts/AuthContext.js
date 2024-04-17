import React, { useContext, useState, useEffect } from 'react'
import {
  loginWithEmailAndPassword,
  registerNewUser,
  getAllUsers,
  purchaseGymPassByIdandPassOptionId,
  getUserPasses,
  addFavoriteGym,
  getFavoriteGyms,
  removeFavoriteGym
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
    const [userGymId, setUserGymId] = useState(null)
    const [favoriteGyms, setFavoriteGyms] = useState([])

    useEffect(() => {
      LogBox.ignoreLogs(['Asyncstorage: ...'])
      LogBox.ignoreAllLogs()
    }, [])

    useEffect(() => {
      if (bearerToken) userFavoriteGyms()
    }, [bearerToken])

    async function login(email, password){
      return new Promise((resolve, reject) => {
        loginWithEmailAndPassword(email, password).then(tokenInfo => {
          
          const {access_token, role, gym_id} = tokenInfo

          const decrypted = decryptToken(access_token)

          if (role=='gym'){
            setUserGymId(gym_id)
          }

          setBearerToken(access_token)
          setCurrentUser(decrypted)
          setUserRole(role)
          resolve(role)

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

    async function userFavoriteGyms() {
      return new Promise((resolve, reject) => {
        getFavoriteGyms(bearerToken).then((data) => {
          setFavoriteGyms(data.favorites)
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    }

    async function userAddFavoriteGym(gym_id, gym_name, gym_city) {
      const {sub} = currentUser
      return new Promise((resolve, reject) => {
        addFavoriteGym(bearerToken, sub, gym_id).then((data) => {
          setFavoriteGyms(prevState => ([...prevState, [gym_id, gym_name, gym_city]]))
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
    }

    function userRemoveFavoriteGym(gym_id) {
      return new Promise((resolve, reject) => {
        removeFavoriteGym(bearerToken, gym_id).then((data) => {
          setFavoriteGyms(prevState => (prevState.filter(subArray => subArray[0] != gym_id)))
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
      })
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
      userPasses,
      userAddFavoriteGym,
      userRemoveFavoriteGym,
      favoriteGyms
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
