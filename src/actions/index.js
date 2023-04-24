const SET_INPUT = 'SET_INPUT';
const HOVER_EFFECT = 'HOVER_EFFECT';

export const setInput = (e) => {
    return {
        type: SET_INPUT,
        payload: e
    }
}

export const hoverEffect = (e) => {
    return {
        type: HOVER_EFFECT,
        payload: e
    }
}