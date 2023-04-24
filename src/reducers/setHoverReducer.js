export const setHoverReducer = (state = false, action) => {
    switch (action.type) {
        case 'HOVER_EFFECT':
            return true
        default:
            return state
    }
}