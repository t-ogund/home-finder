export const setHoverReducer = (state = {hovered: false}, action) => {
    switch (action.type) {
        case 'HOVER_EFFECT':
            return {
                hovered: true,
                index: action.payload
            }
        case 'REMOVE_HOVER_EFFECT':
            return {
                hovered: false,
                index: action.payload
            }
        default:
            return state
    }
}