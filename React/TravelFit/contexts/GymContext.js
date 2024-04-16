import React, { useContext, useState, useEffect } from 'react'

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

    const value = {
        log,
        setLog
    }

    return (
      <AuthContext.Provider value = {value}>
          {children}
      </AuthContext.Provider>
    )
}
