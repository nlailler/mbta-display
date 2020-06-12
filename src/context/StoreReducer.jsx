export const ACTIONS = {
  DATA_LOADED: 'DATA_LOADED',
};

export const INITIAL_STATE = {
  isLoading: true,
  departures: [],
  dispatch: () => { console.error('dispatch not set'); } // eslint-disable-line no-console
};

export default function reducer (state, action) {
  switch (action.type) {
  case ACTIONS.DATA_LOADED:
    return { ...state, isLoading: false, departures: action.departures };
  default:
    throw new Error();
  }
};
