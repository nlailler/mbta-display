import React,{ useReducer } from "react";
import DisplayProvider from '../src/context/DisplayProvider';
import DisplayContainer from '../src/DisplayContainer';
import StoreReducer from '../src/context/StoreReducer';

export default function MockApp({ initialState }) {
  const [state, dispatch] = useReducer(StoreReducer, initialState);
  state.dispatch = dispatch;

  return (
    <DisplayProvider value={state}>
      <DisplayContainer />
    </DisplayProvider>
  );
}
