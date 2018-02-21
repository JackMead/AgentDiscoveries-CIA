import dispatcher from '../dispatcher'

export function updateRegions() {
    dispatcher.dispatch({
        type: 'UPDATE_REGIONS'
    })
}