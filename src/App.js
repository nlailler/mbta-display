import React,{ useReducer } from "react";
import DisplayProvider from './context/DisplayProvider';
import DisplayContainer from './DisplayContainer';
import StoreReducer from './context/StoreReducer';

export default function App() {
  const initialState = {
    isLoading: true,
    departures: [],
    dispatch: () => {console.error('dispatch not set');} // eslint-disable-line no-console
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);
  state.dispatch = dispatch;

  return (
    <DisplayProvider value={state}>
      <DisplayContainer />
    </DisplayProvider>
  );
}
