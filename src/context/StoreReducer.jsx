export const ACTIONS = {
  DATA_LOADED: 'DATA_LOADED',
};

export default function reducer (state, action) {
  switch (action.type) {
  case ACTIONS.DATA_LOADED:
    return { ...state, isLoading: false, departures: action.departures };
  default:
    throw new Error();
  }
};
