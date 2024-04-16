import React, { useContext, useState, useEffect } from 'react'
import { PostVerifyPass } from './GymConnection'

const AuthContext = React.createContext()

export function useGym(){
    return useContext(AuthContext)
}

export function GymProvider({ children }) {
    const [log, setLog] = useState([{
        "duration": 1, 
        "gym_id": 6, 
        "pass_id": 2, 
        "pass_name": "Day Pass", 
        "scan_url": "http://127.0.0.1:8000/verify-pass", 
        "user_id": 7
    },{
        "duration": 1, 
        "gym_id": 6, 
        "pass_id": 2, 
        "pass_name": "Day Pass", 
        "scan_url": "http://127.0.0.1:8000/verify-pass", 
        "user_id": 7
    }])

    function VerifyPass({pass_id, user_id, gym_id, pass_name, duration}) {
        return PostVerifyPass(pass_id, user_id, gym_id, pass_name, duration)
    }

    const value = {
        log,
        setLog,
        VerifyPass
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
