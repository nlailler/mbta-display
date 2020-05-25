import React,{ useReducer } from "react";
import DisplayProvider from './context/DisplayProvider';
import DisplayContainer from './DisplayContainer';
import StoreReducer from './context/StoreReducer';

export default function App() {
  const initialState = {
    isLoading: true,
    departures: [{
      carrier: 'AMTRACK',
      time: '6:15 PM',
      destination: 'Rockport',
      trainNumber: '1234',
      trackNumber: 'TBD',
      status: 'ON TIME'
    }]
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);
  state.dispatch = dispatch;

  return (
    <DisplayProvider value={state}>
      <DisplayContainer />
    </DisplayProvider>
  );
}
