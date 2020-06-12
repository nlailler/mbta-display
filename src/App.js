import React,{ useReducer } from "react";
import DisplayProvider from './context/DisplayProvider';
import DisplayContainer from './DisplayContainer';
import StoreReducer, { INITIAL_STATE } from './context/StoreReducer';

export default function App() {
  const [state, dispatch] = useReducer(StoreReducer, INITIAL_STATE);
  state.dispatch = dispatch;

  return (
    <DisplayProvider value={state}>
      <DisplayContainer />
    </DisplayProvider>
  );
}
