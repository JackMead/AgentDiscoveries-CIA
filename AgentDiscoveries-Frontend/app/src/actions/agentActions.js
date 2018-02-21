import dispatcher from '../dispatcher'

export function updateAgents() {
    dispatcher.dispatch({
        type: 'UPDATE_AGENTS'
    })
}