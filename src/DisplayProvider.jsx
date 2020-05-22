import React, { useReducer } from 'react';

export const DisplayContext = React.createContext({});

export default function DisplayProvider(props) {
  // const { children, value } = props;
  const { children } = props;
  const reducer = (state, action) => {
    switch (action.type) {
    case 'increment':
      return state;
    default:
      throw new Error();
    }
  };
  const initialState = {
    departures: [{
      carrier: 'AMTRACK',
      time: '6:15 PM',
      destination: 'Rockport',
      trainNumber: '1234',
      trackNumber: 'TBD',
      status: 'ON TIME'
    }]
  };
  const [state, ] = useReducer(reducer, initialState);

  return (
    <DisplayContext.Provider value={state}>
      {children}
    </DisplayContext.Provider>
  );
}
