import { EventEmitter } from 'events'
import { searchAPI } from '../components/crud'
import dispatcher from '../dispatcher'

class LocationStore extends EventEmitter {
    constructor() {
        super()
        this.locations = []
    }

    getAll() {
        return this.locations
    }

    addLocation(location) {
        this.locations.push(location)
        this.emit("change")
    }

    updateAllLocations() {
        searchAPI("v1/api/locations", "")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw "Could not retrieve the Locations"
                }
            })
            .then(response => {
                this.locations = response
                this.emit("change")
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleActions(action) {
        switch (action.type) {
            case "UPDATE_LOCATIONS": {
                this.updateAllLocations()
            }
        }
    }
}

const locationStore = new LocationStore

export default locationStore
dispatcher.register(locationStore.handleActions.bind(locationStore))