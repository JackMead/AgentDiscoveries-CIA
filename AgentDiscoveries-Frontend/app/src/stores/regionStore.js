import { EventEmitter } from 'events'
import { searchAPI } from '../components/crud'
import dispatcher from '../dispatcher'

class RegionStore extends EventEmitter {
    constructor() {
        super()
        this.regions = []
    }

    getAll() {
        return this.regions
    }

    addRegion(region) {
        this.regions.push(region)
        this.emit("change")
    }

    updateAllRegions() {
        searchAPI("v1/api/regions", "")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw "Could not retrieve the Regions"
                }
            })
            .then(response => {
                this.regions = response
                this.emit("change")
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleActions(action) {
        switch (action.type) {
            case "UPDATE_REGIONS": {
                this.updateAllRegions()
            }
        }
    }
}

const regionStore = new RegionStore

export default regionStore
dispatcher.register(regionStore.handleActions.bind(regionStore))