import React from "react";
import DisplayProvider from './DisplayProvider';
import DisplayContainer from './DisplayContainer';

export default function App() {
  const initialState = {};
  return (
    <DisplayProvider value={initialState}>
      <DisplayContainer />
    </DisplayProvider>
  );
}
