import { EventEmitter } from 'events'
import { searchAPI } from '../components/crud'
import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
    constructor() {
        super()
        this.users = []
    }

    getAll() {
        return this.users
    }

    addUser(user) {
        this.users.push(user)
        this.emit("change")
    }

    updateAllUsers() {
        searchAPI("v1/api/users", "")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw "Could not retrieve the Users"
                }
            })
            .then(response => {
                this.users = response
                this.emit("change")
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleActions(action) {
        switch (action.type) {
            case "UPDATE_USERS": {
                this.updateAllUsers()
            }
        }
    }
}

const userStore = new UserStore

export default userStore
dispatcher.register(userStore.handleActions.bind(userStore))