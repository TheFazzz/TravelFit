import React, {useEffect} from "react"

class UserConstructor {
    constructor(email, password, id) {
        this.email = email
        this.password = password
        this.id = id
    }

    updateEmail(email){
        this.email = email
    }

    updatePassword(password){
        this.password = password
    }
}

class AuthContructor {

    constructor() {
        this.user = null
        this.users = []
        this.onAuthChangeCallbacks = []
    }

    setUser(user) {
        this.user = user
        this.onAuthChangeCallbacks.forEach(callback => callback(user))
    }

    createUserWithEmailAndPassword(email, password) {
        var id = "id" + Math.random().toString(16).slice(2)
        const newUser = new UserConstructor(email, password, id)
        this.users.push(newUser)
        this.setUser(newUser)
    }

    signInWithEmailAndPassword(email, password) {
        for (const user of this.users) {
            if (user.email == email && user.password == password){
                this.setUser(user)
                return
            }
        }
    }

    signOut() {
        this.setUser(null)
    }

    sendPasswordResetEmail(email) {
        //send pasword reset email
    }

    onAuthStateChanged(callback) {
        this.onAuthChangeCallbacks.push(callback)
        callback(this.user)

        return () => {
            this.onAuthChangeCallbacks = this.onAuthChangeCallbacks.filter(cb => cb !== callback)
        }
    }
}

const auth = new AuthContructor()
export default auth