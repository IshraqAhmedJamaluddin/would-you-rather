export const RECEIVED_USERS = 'RECEIVED_USERS'

export function receiveUsers(users) {
    return {
        type: RECEIVED_USERS,
        users,
    }
}