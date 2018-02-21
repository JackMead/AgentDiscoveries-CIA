import dispatcher from '../dispatcher'

export function updateLocations() {
    dispatcher.dispatch({
        type: 'UPDATE_LOCATIONS'
    })
}