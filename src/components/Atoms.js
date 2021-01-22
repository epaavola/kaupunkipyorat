import { atom } from 'recoil';

export const searchTextState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const originState = atom({
    key: 'originState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});

export const destinationState = atom({
    key: 'destinationState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});

export const routeState = atom({
    key: 'routeState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});