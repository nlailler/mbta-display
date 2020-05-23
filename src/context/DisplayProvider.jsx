import React, { useReducer } from 'react';
import StoreReducer from './StoreReducer';

export const DisplayContext = React.createContext({});

export default function DisplayProvider(props) {
  const { children } = props;

  const initialState = {
    isLoading: false,
    departures: [{
      carrier: 'AMTRACK',
      time: '6:15 PM',
      destination: 'Rockport',
      trainNumber: '1234',
      trackNumber: 'TBD',
      status: 'ON TIME'
    }]
  };
  const [state, ] = useReducer(StoreReducer, initialState);

  return (
    <DisplayContext.Provider value={state}>
      {children}
    </DisplayContext.Provider>
  );
}
