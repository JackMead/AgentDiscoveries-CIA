import dispatcher from '../dispatcher'

export function updateUsers() {
    dispatcher.dispatch({
        type: 'UPDATE_USERS'
    })
}